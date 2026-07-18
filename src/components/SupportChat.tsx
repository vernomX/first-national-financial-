import { useState, useEffect, useRef, useCallback } from 'react';

interface Msg { from: 'user' | 'agent'; text: string; ts: number; }

// Stable per-visitor session id (persists across refresh)
function getSessionId(): string {
    const KEY = 'fnf_support_session';
    let id = sessionStorage.getItem(KEY);
    if (!id) {
        id = 'sess_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
        sessionStorage.setItem(KEY, id);
    }
    return id;
}

export default function SupportChat() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Msg[]>([]);
    const [input, setInput] = useState('');
    const [sending, setSending] = useState(false);
    const sessionId = useRef<string>('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => { sessionId.current = getSessionId(); }, []);

    // Let other parts of the app (e.g. the Dashboard "Support" button) open this chat
    useEffect(() => {
        (window as any).openSupportChat = () => setOpen(true);
        return () => { delete (window as any).openSupportChat; };
    }, []);

    const poll = useCallback(async () => {
        if (!sessionId.current) return;
        try {
            const res = await fetch(`/api/support-poll?session=${sessionId.current}`);
            const data = await res.json();
            if (Array.isArray(data.messages)) setMessages(data.messages);
        } catch { /* ignore */ }
    }, []);

    // Poll every 3s while open
    useEffect(() => {
        if (!open) return;
        poll();
        const t = setInterval(poll, 3000);
        return () => clearInterval(t);
    }, [open, poll]);

    // Auto-scroll to newest
    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages, open]);

    const send = async () => {
        const text = input.trim();
        if (!text || sending) return;
        setSending(true);
        // optimistic
        setMessages(prev => [...prev, { from: 'user', text, ts: Date.now() }]);
        setInput('');
        try {
            await fetch('/api/support-send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId: sessionId.current, text }),
            });
            setTimeout(poll, 800);
        } catch { /* ignore */ }
        setSending(false);
    };

    return (
        <>
            <style>{`
                .fnf-sc-btn {
                    position: fixed; bottom: 24px; right: 24px; z-index: 9998;
                    width: 60px; height: 60px; border-radius: 50%; border: none; cursor: pointer;
                    background: linear-gradient(160deg, #16294c, #0e1f3d);
                    color: #e2c47f; box-shadow: 0 10px 30px rgba(10,23,48,0.4);
                    display: flex; align-items: center; justify-content: center;
                    transition: transform 0.15s ease;
                }
                .fnf-sc-btn:hover { transform: scale(1.05); }
                .fnf-sc-panel {
                    position: fixed; bottom: 96px; right: 24px; z-index: 9999;
                    width: min(380px, calc(100vw - 32px)); height: min(560px, calc(100vh - 140px));
                    background: #fff; border-radius: 16px; overflow: hidden;
                    box-shadow: 0 24px 60px rgba(10,23,48,0.3); border: 1px solid #e7e2d6;
                    display: flex; flex-direction: column;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                .fnf-sc-head {
                    background: linear-gradient(160deg, #0e1f3d, #14274a); color: #fff;
                    padding: 18px 20px; display: flex; align-items: center; gap: 12px;
                }
                .fnf-sc-head .dot { width: 9px; height: 9px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
                .fnf-sc-head h3 { font-family: Georgia, serif; font-size: 16px; margin: 0; font-weight: 700; }
                .fnf-sc-head p { margin: 2px 0 0; font-size: 12px; color: #9aa6b8; }
                .fnf-sc-close { margin-left: auto; background: none; border: none; color: rgba(255,255,255,0.7); cursor: pointer; padding: 4px; }
                .fnf-sc-body { flex: 1; overflow-y: auto; padding: 18px; background: #f6f4ef; display: flex; flex-direction: column; gap: 10px; }
                .fnf-sc-row { display: flex; }
                .fnf-sc-row.user { justify-content: flex-end; }
                .fnf-sc-bubble {
                    max-width: 78%; padding: 10px 14px; border-radius: 14px; font-size: 14px; line-height: 1.45;
                }
                .fnf-sc-bubble.user { background: #0e1f3d; color: #fff; border-bottom-right-radius: 4px; }
                .fnf-sc-bubble.agent { background: #fff; color: #101828; border: 1px solid #e7e2d6; border-bottom-left-radius: 4px; }
                .fnf-sc-empty { text-align: center; color: #667085; font-size: 13px; margin: auto 0; padding: 20px; }
                .fnf-sc-foot { padding: 12px; border-top: 1px solid #e7e2d6; background: #fff; display: flex; gap: 8px; }
                .fnf-sc-input {
                    flex: 1; border: 1px solid #e7e2d6; border-radius: 10px; padding: 11px 14px; font-size: 14px;
                    outline: none; font-family: inherit;
                }
                .fnf-sc-input:focus { border-color: #c9a24a; box-shadow: 0 0 0 3px rgba(201,162,74,0.15); }
                .fnf-sc-send {
                    border: none; border-radius: 10px; padding: 0 16px; cursor: pointer; color: #1a1300;
                    background: linear-gradient(180deg, #e2c47f, #c9a24a); font-weight: 700; font-size: 14px;
                }
                .fnf-sc-send:disabled { opacity: 0.5; cursor: default; }
            `}</style>

            {open && (
                <div className="fnf-sc-panel">
                    <div className="fnf-sc-head">
                        <span className="dot" />
                        <div>
                            <h3>First National Support</h3>
                            <p>We typically reply in a few minutes</p>
                        </div>
                        <button className="fnf-sc-close" onClick={() => setOpen(false)} aria-label="Close">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>
                    </div>
                    <div className="fnf-sc-body" ref={scrollRef}>
                        {messages.length === 0 ? (
                            <div className="fnf-sc-empty">👋 Hi! How can we help you today? Send us a message and our team will respond shortly.</div>
                        ) : (
                            messages.map((m, i) => (
                                <div key={i} className={`fnf-sc-row ${m.from}`}>
                                    <div className={`fnf-sc-bubble ${m.from}`}>{m.text}</div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="fnf-sc-foot">
                        <input
                            className="fnf-sc-input"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') send(); }}
                            placeholder="Type your message..."
                        />
                        <button className="fnf-sc-send" onClick={send} disabled={sending || !input.trim()}>Send</button>
                    </div>
                </div>
            )}

            <button className="fnf-sc-btn" onClick={() => setOpen(v => !v)} aria-label="Support chat">
                {open ? (
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                )}
            </button>
        </>
    );
}
