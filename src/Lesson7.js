import React, { useState, useEffect } from 'react';

export const FriendStatus = props => {
	const [isOnline, setIsOnline] = useState(null);

	useEffect(() => {
		function handleStatusChange(status) {
			setIsOnline(status.isOnline);
		}

		ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
		return () => {
			ChatAPI.unsubscribeFromFriendStatus(
				props.friend.id,
				handleStatusChange
			);
		};
	});

	if (isOnline === null) {
		return 'Loading...';
	}
	return isOnline ? 'Online' : 'Offline';
};

export const FriendListItem = props => {
	const [isOnline, setIsOnline] = useState(null);

	useEffect(() => {
		function handleStatusChange(status) {
			setIsOnline(status.isOnline);
		}

		ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
		return () => {
			ChatAPI.unsubscribeFromFriendStatus(
				props.friend.id,
				handleStatusChange
			);
		};
	});

	return (
		<li style={{ color: isOnline ? 'green' : 'black' }}>
			{props.friend.name}
		</li>
	);
};

// THE ABOVE ARE DUPLICATING SAME LOGIC, SO WE DO THIS

const useFriendStatus = friendID => {
	const [isOnline, setIsOnline] = useState(null);

	useEffect(() => {
		function handleStatusChange(status) {
			setIsOnline(status.isOnline);
		}

		ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
		return () => {
			ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
		};
	});

	return isOnline;
};

const updatedFriendStatus = props => {
	const isOnline = useFriendStatus(props.friend.id);

	if (isOnline === null) {
		return 'Loading...';
	}
	return isOnline ? 'Online' : 'Offline';
};

const updatedFriendListItem = props => {
	const isOnline = useFriendStatus(props.friend.id);

	return (
		<li style={{ color: isOnline ? 'green' : 'black' }}>
			{props.friend.name}
		</li>
	);
};

// Tip: Pass Information Between Hooks

const friendList = [
	{ id: 1, name: 'Phoebe' },
	{ id: 2, name: 'Rachel' },
	{ id: 3, name: 'Ross' },
];

function ChatRecipientPicker() {
	const [recipientID, setRecipientID] = useState(1);
	const isRecipientOnline = useFriendStatus(recipientID);

	return (
		<>
			<Circle color={isRecipientOnline ? 'green' : 'red'} />
			<select
				value={recipientID}
				onChange={e => setRecipientID(Number(e.target.value))}
			>
				{friendList.map(friend => (
					<option key={friend.id} value={friend.id}>
						{friend.name}
					</option>
				))}
			</select>
		</>
	);
}

// useEffect, the hooks lifrcycke implementation

function FriendStatusWithCounter(props) {
	const [count, setCount] = useState(0);
	useEffect(() => {
		document.title = `You clicked ${count} times`;
	});

	const [isOnline, setIsOnline] = useState(null);
	useEffect(
		() => {
			function handleStatusChange(status) {
				setIsOnline(status.isOnline);
			}

			ChatAPI.subscribeToFriendStatus(
				props.friend.id,
				handleStatusChange
			);
			return () => {
				ChatAPI.unsubscribeFromFriendStatus(
					props.friend.id,
					handleStatusChange
				);
			};
		},
		[props.friend.id] //Tip: Optimizing Performance by Skipping Effects
	);

	// If you use this optimization, make sure the array includes all values from
	// the component scope (such as props and state) that change over time and that are
	// used by the effect. Otherwise, your code will reference stale values from previous renders.
	// Learn more about how to deal with functions and what to do when the array changes too often.
	// If you want to run an effect and clean it up only once (on mount and unmount),
	// you can pass an empty array ([]) as a second argument. This tells React that your effect doesn’t
	// depend on any values from props or state, so it never needs to re-run. This isn’t handled as a
	// special case — it follows directly from how the dependencies array always works.

	// If you pass an empty array ([]), the props and state inside the effect will always have their
	//  initial values. While passing [] as the second argument is closer to the familiar componentDidMount
	//  and componentWillUnmount mental model, there are usually better solutions to avoid re-running effects
	//  too often. Also, don’t forget that React defers running useEffect until after the browser has painted,
	//  so doing extra work is less of a problem.

	// We recommend using the exhaustive-deps rule as part of our eslint-plugin-react-hooks package. It warns
	// when dependencies are specified incorrectly and suggests a fix.
}

// REDUCER LOGIC IN HOOKS
// For example, maybe you have a complex component that contains a lot of local
// state that is managed in an ad-hoc way. useState doesn’t make centralizing the
// update logic any easier so you might prefer to write it as a Redux reducer:

function todosReducer(state, action) {
	switch (action.type) {
		case 'add':
			return [
				...state,
				{
					text: action.text,
					completed: false,
				},
			];
		// ... other actions ...
		default:
			return state;
	}
}

function useReducer(reducer, initialState) {
	const [state, setState] = useState(initialState);

	function dispatch(action) {
		const nextState = reducer(state, action);
		setState(nextState);
	}

	return [state, dispatch];
}

function Todos() {
	const [todos, dispatch] = useReducer(todosReducer, []);

	function handleAddClick(text) {
		dispatch({ type: 'add', text });
	}
	// ...
}
