import React, { useState, useContext, useEffect } from 'react';
import { ChatContext } from '../ContextProvider';
import { useSearchParams } from 'react-router-dom';

const Chat = () => {
	const {
		sendMessage,
		chatMsgHistory,
		userInfo,
		removeMessage,
		getChatHistory,
		handleInviteUser,
		users
	} = useContext(ChatContext);

	const [message, setMessage] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();
	const [showFakeMessages, setShowFakeMessages] = useState(false);
	const [visibleMessages, setVisibleMessages] = useState([]);
	const [messageIndex, setMessageIndex] = useState(0);

	const errorMessage = searchParams.get('error');
	const [chatMessages, setChatMessages] = useState([
		{
			text: 'Hej',
			avatar: 'https://i.pravatar.cc/50?img=10',
			isUser: false
		},
		{
			text: 'Hur är läget?',
			avatar: 'https://i.pravatar.cc/50?img=10',
			isUser: false
		},
		{
			text: 'Vad händer idag?',
			avatar: 'https://i.pravatar.cc/50?img=10',
			isUser: false
		},
		{
			text: 'Hallå!!',
			avatar: 'https://i.pravatar.cc/50?img=10',
			isUser: false
		}
	]);

	// Hanterar visning av fejk-meddelanden i chatten
	useEffect(() => {
		if (messageIndex < chatMessages.length && showFakeMessages) {
			const timer = setTimeout(() => {
				setVisibleMessages((prevMessages) => [
					...prevMessages,
					chatMessages[messageIndex]
				]);
				setMessageIndex((prevIndex) => prevIndex + 1);
			}, 2000);

			return () => clearTimeout(timer);
		}
	}, [messageIndex, chatMessages, showFakeMessages]);

	// Hämtar chatthistorik när komponenten laddas
	useEffect(() => {
		if (userInfo) {
			getChatHistory();
		}
	}, [userInfo, getChatHistory]);

	// Funktion för att hantera sändning av meddelanden
	const handleSendMessage = () => {
		if (message.trim()) {
			sendMessage(message);
			setMessage('');
			setShowFakeMessages(false);
			setTimeout(() => {
				setShowFakeMessages(true);
			}, 2000);
		}
	};

	// Hanterar "Enter"-knapptryck för att skicka meddelanden
	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSendMessage();
		}
	};

	// Filtrerar användare baserat på sökfrågan
	const filteredUsers = (users || []).filter((user) =>
		user.username.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className='flex flex-row overflow-y-auto h-[90vh] w-full max-w-full '>
			<div className='flex flex-col items-center justify-center overflow-y-auto h-[80vh] w-full max-w-full '>
				<div className='flex flex-col items-center pb-2 pt-6 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3'>
					{/* Visar användarens avatar och en hälsning om användarinfo finns */}
					{userInfo && (
						<>
							<img
								src={userInfo.avatar || 'https://i.pravatar.cc/150?img='}
								alt='User Avatar'
								className='w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover'
							/>
							<h1 className='text-lg sm:text-xl font-bold mt-2'>
								Hello {userInfo.user}
							</h1>
						</>
					)}
				</div>

				{/* Chattfönster som visar alla meddelanden, inklusive fejk-meddelanden */}
				<div
					className='flex-1 w-full sm:w-3/4 md:w-2/4 lg:w-2/4 xl:w-2/5
        border-2 border-gray-400 overflow-y-auto p-4 bg-orange-500 bg-opacity-20'>
					{chatMsgHistory
						.map((chatMsg) => ({
							...chatMsg,
							isUser: true
						}))
						.map((msg, index) => (
							<div
								key={index}
								className={`flex ${
									msg.isUser ? 'justify-end' : 'justify-start'
								} mb-4 pl-4`}>
								{msg.isUser && (
									<div className='flex items-center space-x-2'>
										<div className='flex items-center'>
											<button
												className='btn btn-ghost btn-outline btn-xs btn-error mr-2 border-2 mt-5'
												onClick={() => removeMessage(msg.id)}>
												X
											</button>
											<div className='flex flex-col items-start'>
												<div className='text-sm font-bold'>{userInfo.user}</div>
												<div className='chat-bubble bg-blue-400 text-white p-2 rounded-lg max-w-lg'>
													{msg.text}
												</div>
											</div>
										</div>
										{userInfo && (
											<img
												src={userInfo.avatar}
												alt='Avatar'
												className='w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mt-4'
											/>
										)}
									</div>
								)}
							</div>
						))}
					{visibleMessages.map((cMsg, idx) => (
						<div className='flex items-start space-x-3 pl-4' key={idx}>
							<img
								src={cMsg.avatar || 'https://i.pravatar.cc/50?img=10'}
								alt='Avatar'
								className='w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-2 mt-5'
							/>
							<div className='flex flex-col items-start'>
								<div className='text-sm font-bold'>Chat-Buddy</div>
								<div className='chat-bubble bg-gray-50-400 white p-2 rounded-lg max-w-lg'>
									{cMsg.text}
								</div>
							</div>
						</div>
					))}
				</div>

				<div
					className='w-full sm:w-3/4 md:w-2/4 lg:w-2/4 xl:w-2/5
        flex mt-4 sm:mt-2'>
					<input
						type='text'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder='Type your message...'
						className='inputarea p-2 w-full rounded-l border text-sm sm:text-base'
					/>
					<button
						onClick={handleSendMessage}
						className='p-2 bg-green-800 text-white rounded-r text-sm sm:text-base'>
						Send
					</button>
				</div>
			</div>
			{/* Sidopanel för att visa alla användare */}
			<div className='lg:flex flex-col w-1/3 border-l border-gray-500 p-4'>
				<h1 className='text-lg font-bold mb-4 '></h1>
				{/* Sökfält för att filtrera användare */}
				<div className='sticky top-0 z-10'>
					<input
						type='text'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder='Search users...'
						className='inputarea mb-4 p-2 w-full rounded border-4 text-sm sm:text-base'
					/>
					<h1 className='text-lg font-bold mb-4 '>Users</h1>

					{/* Visar felmeddelanden */}
					{errorMessage && (
						<div className='alert alert-error text-center mb-5'>
							{errorMessage}
						</div>
					)}
				</div>
				<div className='overflow-y-auto max-h-[calc(100vh-160px)]'>
					<ul className='space-y-2 '>
						{filteredUsers.length > 0 ? (
							filteredUsers.map((user, index) => (
								<li
									key={user.id || index}
									className='flex items-center justify-between p-2 border rounded-lg bg-gray-300'>
									<div className='flex items-center'>
										<img
											src={user.avatar || 'https://i.pravatar.cc/50?img='}
											alt='User Avatar'
											className='w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover'
										/>
										<span className='ml-4'>{user.username}</span>
									</div>
									<button
										className='btn btn-xs'
										onClick={() => handleInviteUser()}>
										Invite User
									</button>
								</li>
							))
						) : (
							<li className='p-2'>No users available</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Chat;
