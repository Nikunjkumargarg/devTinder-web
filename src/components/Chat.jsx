import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

const Chat = () => {
  const { targetUserId } = useParams()
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'them',
      text: 'Hey there! 👋',
      timestamp: '10:31 AM',
    },
    {
      id: 2,
      sender: 'me',
      text: 'Hi! Your profile stood out—I’d love to team up on something exciting.',
      timestamp: '10:32 AM',
    },
    {
      id: 3,
      sender: 'them',
      text: 'That sounds awesome. I have a few ideas in mind—want to hear them?',
      timestamp: '10:33 AM',
    },
  ])
  const [draftMessage, setDraftMessage] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    const trimmedMessage = draftMessage.trim()

    if (!trimmedMessage) {
      return
    }

    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: trimmedMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    setMessages((prev) => [...prev, newMessage])
    setDraftMessage('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white'>
      <div className='mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-4 py-12 sm:px-6'>
        <div className='relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-[0_35px_120px_-35px_rgba(15,23,42,0.75)] backdrop-blur-xl'>
          <div className='absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-indigo-500/10 to-transparent' />

          <header className='relative z-10 flex items-center gap-4 border-b border-white/10 bg-slate-900/40 px-8 py-6'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-lg font-semibold shadow-lg'>
              {(targetUserId && targetUserId.charAt(0).toUpperCase()) || 'D'}
            </div>
            <div>
              <h1 className='text-xl font-semibold tracking-tight'>
                Chat with {targetUserId || 'Dev Partner'}
              </h1>
              <p className='text-sm text-slate-300'>You’re both online — say hi!</p>
            </div>
          </header>

          <div className='relative z-10 flex h-[60vh] flex-col gap-4 overflow-y-auto px-6 py-6 pr-4'>
            {messages.map((message) => {
              const isMe = message.sender === 'me'

              return (
                <div
                  key={message.id}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-3xl px-5 py-4 text-sm leading-relaxed shadow-2xl ${
                      isMe
                        ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-slate-50'
                        : 'border border-white/10 bg-white/10 text-slate-100'
                    }`}
                  >
                    <p className='whitespace-pre-wrap'>{message.text}</p>
                    <span className='mt-2 block text-[11px] uppercase tracking-wide text-white/60'>
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          <footer className='relative z-10 border-t border-white/10 bg-slate-900/60 px-6 py-5'>
            <div className='flex items-end gap-3'>
              <textarea
                value={draftMessage}
                onChange={(event) => setDraftMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Write a thoughtful message…'
                className='h-24 w-full flex-1 resize-none rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm text-white outline-none transition focus:border-indigo-400/70 focus:bg-slate-900/50 focus:shadow-[0_15px_40px_-20px_rgba(79,70,229,0.9)]'
              />
              <button
                type='button'
                onClick={handleSend}
                className='flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-base font-semibold shadow-xl transition hover:scale-105 hover:shadow-[0_20px_50px_-15px_rgba(129,140,248,0.75)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300 disabled:cursor-not-allowed disabled:opacity-60'
                disabled={!draftMessage.trim()}
              >
                Send
              </button>
            </div>
            <p className='mt-3 text-xs text-slate-400'>
              Press <span className='font-semibold text-indigo-300'>Shift + Enter</span> for a new
              line
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Chat