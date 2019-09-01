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
