import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Bot, User, RefreshCw, ChevronDown, Mic, Globe } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { BANNERS } from '../data/banners';
import { PRODUCT_CATEGORIES } from '../utils/constants';
import { formatCurrency } from '../utils/helpers';

const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'te', name: 'తెలుగు (Telugu)' }
];

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [selectedLang, setSelectedLang] = useState('en');
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef(null);

    const initialMessages = [
        {
            id: '1',
            sender: 'bot',
            text: "Hello! Welcome to GoldArc Jewellery. ✨ I'm your AI concierge. How can I assist you today?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestions: ['Show Gold Necklaces', 'Diamond Solitaires', 'Exchange Offer', 'Franchise Inquiry']
        }
    ];

    const [messages, setMessages] = useState(initialMessages);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    // Smart Domain AI Response Engine trained on GoldArc Website Data
    const generateAiResponse = (userText) => {
        const query = userText.toLowerCase();

        // 1. Product Search Engine
        if (query.includes('gold') || query.includes('necklace') || query.includes('diamond') || query.includes('ring') || query.includes('bangle') || query.includes('earring') || query.includes('silver') || query.includes('pendant')) {
            const matches = PRODUCTS.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            ).slice(0, 3);

            if (matches.length > 0) {
                const productListStr = matches.map(p => `• **${p.name}** (${p.purity}): ${formatCurrency(p.price)}`).join('\n');
                return {
                    text: `Here are some exquisite pieces matching your search:\n\n${productListStr}\n\nYou can view our complete collection in the **Collection** tab!`,
                    suggestions: ['View All Products', 'Filter by Price', 'Contact Store']
                };
            }
        }

        // 2. Categories Inquiry
        if (query.includes('category') || query.includes('collection') || query.includes('show') || query.includes('types')) {
            const categoriesList = Object.values(PRODUCT_CATEGORIES).join(', ');
            return {
                text: `We offer a magnificent range of certified jewellery across these categories:\n\n✨ **${categoriesList}**\n\nWhich category would you like to explore?`,
                suggestions: ['Gold Jewellery', 'Diamond Jewellery', 'Silver Collection', 'Gemstones']
            };
        }

        // 3. Exchange Offer Inquiry
        if (query.includes('exchange') || query.includes('old gold') || query.includes('offer') || query.includes('trade')) {
            return {
                text: `🎉 **GoldArc Gold Exchange Program**\n\nTrade in your old gold for **100% full market value** against any new purchase! Zero deduction on melt value for 22K gold. Visit any GoldArc branch today for instant evaluation.`,
                suggestions: ['Find Nearest Branch', 'View Gold Rate', 'Contact Support']
            };
        }

        // 4. Franchise & Branch Inquiry
        if (query.includes('franchise') || query.includes('partner') || query.includes('business') || query.includes('branch')) {
            return {
                text: `💼 **Become a GoldArc Franchise Partner**\n\nJoin our rapidly expanding network across India. We offer complete inventory management, head-office support, logistics transport, and high returns.\n\nVisit our **Contact** page or get in touch at **franchise@goldarc.com**.`,
                suggestions: ['Franchise Requirements', 'Contact Head Office']
            };
        }

        // 5. Purity & Certification
        if (query.includes('purity') || query.includes('hallmark') || query.includes('certif') || query.includes('quality')) {
            return {
                text: `🛡️ **100% Certified Assurance**\n\nAll GoldArc gold jewellery is **BIS 916 Hallmarked (22K)**. Our diamonds are **IGI / GIA Certified** with guaranteed clarity and cut standards.`,
                suggestions: ['View Diamond Rings', 'View Gold Bangles']
            };
        }

        // 6. Pricing & Making Charges
        if (query.includes('price') || query.includes('making') || query.includes('charge') || query.includes('cost')) {
            return {
                text: `💎 Our pricing is transparent! Making charges start at just **8%** on standard gold ornaments. To view exact live wholesale prices, please log in with your Branch Credentials.`,
                suggestions: ['Branch Login', 'Browse Collection']
            };
        }

        // 7. Store Contact & Hours
        if (query.includes('contact') || query.includes('phone') || query.includes('hour') || query.includes('location') || query.includes('address')) {
            return {
                text: `📍 **GoldArc Head Office**\n• Address: 101 Gold Arcade, Zaveri Bazaar, Mumbai\n• Phone: +91 1800 233 4653\n• Email: support@goldarc.com\n• Hours: Mon - Sat (10:00 AM - 8:30 PM)`,
                suggestions: ['Email Support', 'Franchise Info']
            };
        }

        // Default Intelligent Fallback Response
        return {
            text: `Thank you for reaching out! I can help you explore our Gold & Diamond collections, check exchange offers, learn about franchise opportunities, or locate store details. What would you like to know more about?`,
            suggestions: ['Explore Collection', 'Exchange Old Gold', 'Franchise Info', 'Contact Us']
        };
    };

    const handleSend = (textToSend = input) => {
        const queryText = textToSend.trim();
        if (!queryText) return;

        const userMsg = {
            id: Date.now().toString(),
            sender: 'user',
            text: queryText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate Realtime AI Thinking & Typing delay
        setTimeout(() => {
            const aiResult = generateAiResponse(queryText);
            const botMsg = {
                id: (Date.now() + 1).toString(),
                sender: 'bot',
                text: aiResult.text,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                suggestions: aiResult.suggestions
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 800);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Chat Widget Trigger Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(prev => !prev)}
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-700 text-white p-3.5 md:px-5 md:py-3.5 rounded-full shadow-2xl hover:shadow-gold-500/30 transition-all border border-gold-300/40"
                aria-label="Open AI Assistant Chat"
            >
                <div className="relative">
                    <MessageCircle size={24} className="text-white" />
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping" />
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full" />
                </div>
                <span className="hidden md:inline font-serif font-medium tracking-wide">GoldArc AI</span>
            </motion.button>

            {/* Realtime Chat Window Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[520px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gold-200/60 flex flex-col overflow-hidden backdrop-blur-lg"
                    >
                        {/* Chat Header */}
                        <div className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 text-white p-3.5 flex items-center justify-between shadow-md">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30">
                                    <Bot size={20} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-sm leading-tight flex items-center gap-1">
                                        GoldArc Concierge <Sparkles size={13} className="text-gold-200 animate-pulse" />
                                    </h3>
                                    <p className="text-[10px] text-gold-100 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-300 rounded-full inline-block" /> AI Multi-Lang Online
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <select
                                    value={selectedLang}
                                    onChange={(e) => setSelectedLang(e.target.value)}
                                    className="bg-black/20 text-white text-[11px] rounded-lg px-2 py-1 outline-none border border-white/20 cursor-pointer"
                                >
                                    {LANGUAGES.map(lang => (
                                        <option key={lang.code} value={lang.code} className="text-gray-900">
                                            {lang.name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 rounded-full hover:bg-white/20 transition-colors text-white"
                                    aria-label="Close Chat"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Body */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-ivory-50/50 to-white">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                                >
                                    <div className={`flex items-start gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${msg.sender === 'user' ? 'bg-gray-900 text-white' : 'bg-gold-500 text-white'}`}>
                                            {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                                        </div>
                                        <div
                                            className={`p-3.5 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                                    ? 'bg-gray-900 text-white rounded-tr-none'
                                                    : 'bg-white text-gray-800 border border-gold-200/60 shadow-sm rounded-tl-none'
                                                }`}
                                        >
                                            <p className="whitespace-pre-wrap">{msg.text}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-gray-400 mt-1 px-9">
                                        {msg.timestamp}
                                    </span>

                                    {/* Suggested Prompt Chips */}
                                    {msg.suggestions && msg.suggestions.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-3.5 ml-9 max-w-[85%]">
                                            {msg.suggestions.map((chip, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleSend(chip)}
                                                    className="text-xs bg-gold-50/80 border border-gold-300/60 text-gold-800 px-3 py-1 rounded-full hover:bg-gold-100 transition-all shadow-2xs font-medium"
                                                >
                                                    {chip}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-gold-500 text-white flex items-center justify-center shrink-0">
                                        <Bot size={14} />
                                    </div>
                                    <div className="bg-white border border-gold-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-gold-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Footer */}
                        <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder={selectedLang === 'hi' ? "प्रश्न पूछे..." : "Ask GoldArc AI..."}
                                className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 bg-gray-50/50"
                            />
                            <button
                                onClick={() => {
                                    setIsListening(true);
                                    setTimeout(() => {
                                        setInput("Show me gold necklace designs under 1 lakh");
                                        setIsListening(false);
                                    }, 1200);
                                }}
                                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gold-50 text-gold-600 hover:bg-gold-100'
                                    }`}
                                title="Voice Dictation"
                            >
                                <Mic size={16} />
                            </button>
                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim()}
                                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${input.trim()
                                        ? 'bg-gold-500 text-white hover:bg-gold-600 shadow-md'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                aria-label="Send Message"
                            >
                                <Send size={15} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
