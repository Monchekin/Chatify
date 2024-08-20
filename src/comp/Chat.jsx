import React, { useState, useContext, useEffect } from 'react';
import { ChatContext } from '../ContextProvider';

// Huvudkomponenten för chatten
const Chat = () => {
	// Tillstånd för att lagra meddelandet som skrivs in och alla chattmeddelanden
	const [message, setMessage] = useState('');
	const [showFakeMessages, setShowFakeMessages] = useState(false);
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
			text: 'Vad gör du?',
			avatar: 'https://i.pravatar.cc/50?img=10',
			isUser: false
		},
		{
			text: 'Vad ska du göra idag?',
			avatar: 'https://i.pravatar.cc/50?img=10',
			isUser: false
		}
	]);

	// Hämtar funktioner och data från ChatContext
	const {
		sendMessage,
		chatMsgHistory,
		userInfo,
		removeMessage,
		getChatHistory
	} = useContext(ChatContext);

	// Hämta chathistorik när Chat-komponenten laddas
	useEffect(() => {
		if (userInfo) {
			getChatHistory();
		}
	}, [userInfo, getChatHistory]);

	// Funktion för att hantera när användaren skickar ett meddelande
	const handleSendMessage = () => {
		if (message.trim()) {
			sendMessage(message);
			setMessage('');
			setShowFakeMessages(true);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<div className='flex flex-col items-center overflow-y-auto h-dvh w-[95vw]'>
			<div className='flex flex-col items-center pb-2 pt-6'>
				{/* Visar användarens avatar och hälsning om användarinformation finns */}
				{userInfo && (
					<>
						<img
							src={userInfo.avatar || 'https://i.pravatar.cc/150?img='}
							alt='User Avatar'
							className='w-12 h-12 rounded-full object-cover'
						/>
						<h1 className='text-lg font-bold'>Hej {userInfo.user}</h1>
					</>
				)}
			</div>

			{/* Chattfönstret som visar alla meddelanden inkl fejk meddelanden */}
			<div className='flex-1 w-full max-w-lg border-2 border-gray-300 overflow-y-auto max-h-96 p-4'>
				{chatMsgHistory
					// Markerar alla meddelanden som skickade av användaren
					.map((chatMsg) => ({
						...chatMsg,
						isUser: true
					}))

					// Återger varje meddelande
					.map((msg, index) => (
						<div
							key={index}
							className={`flex ${
								msg.isUser ? 'justify-end' : 'justify-start'
							} mb-4`}>
							{msg.isUser && (
								// Visar användarens meddelanden
								<div className='flex items-center space-x-2'>
									<div className='flex items-center'>
										<button
											className='btn btn-ghost btn-outline btn-xs btn-error mr-2'
											onClick={() => removeMessage(msg.id)}>
											X
										</button>

										<div className='chat-bubble bg-blue-400 text-white p-2 rounded-lg max-w-lg'>
											{msg.text}
										</div>
									</div>

									{userInfo && (
										<img
											src={userInfo.avatar}
											alt='Avatar'
											className='w-12 h-12 rounded-full object-cover'
										/>
									)}
								</div>
							)}
						</div>
					))}

				{showFakeMessages &&
					chatMessages.map((cMsg, idx) => (
						// Visar chatt-kompisens meddelanden
						<div className='flex items-start space-x-3' key={idx}>
							<img
								src={cMsg.avatar || 'https://i.pravatar.cc/50?img=10'}
								alt='Avatar'
								className='w-12 h-12 rounded-full object-cover mr-2 mt-5'
							/>
							<div className='flex flex-col items-start'>
								<div className='text-sm font-bold'>Chat-kompis</div>
								<div className='chat-bubble bg-gray-50-400 white p-2 rounded-lg max-w-lg'>
									{cMsg.text}
								</div>
							</div>
						</div>
					))}
			</div>

			{/* Input-fältet och knappen för att skicka meddelanden */}
			<div className='w-full max-w-lg flex'>
				<input
					type='text'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder='Type your message...'
					className='inputarea p-2 w-full rounded-l border'
				/>
				<button
					onClick={handleSendMessage}
					className='p-2 bg-green-800 text-white rounded-r'>
					Send
				</button>
			</div>
		</div>
	);
};

export default Chat;
