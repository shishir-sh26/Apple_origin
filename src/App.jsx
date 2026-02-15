import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    Leaf,
    Wind,
    Droplet,
    Sun,
    Activity,
    Microscope,
    ChevronRight,
    Menu,
    Volume2,
    Share2,
    RefreshCw,
    Database,
    Thermometer,
    Zap,
    X,
    Target
} from 'lucide-react';

// --- Utility Components ---

const GlassCard = ({ children, className = "", delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20, backdropFilter: "blur(0px)" }}
        whileInView={{ opacity: 1, y: 0, backdropFilter: "blur(12px)" }}
        transition={{ duration: 0.8, delay }}
        viewport={{ once: true }}
        className={`glass p-6 rounded-2xl border border-white/20 shadow-2xl ${className}`}
    >
        {children}
    </motion.div>
);

const AnalysisModal = ({ isOpen, onClose, title, data }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-background-dark border border-primary/30 p-8 rounded-3xl max-w-2xl w-full shadow-[0_0_50px_rgba(17,212,82,0.2)]"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-primary text-2xl font-black tracking-tight flex items-center gap-3">
                            <Database className="size-6" />
                            {title}
                        </h2>
                        <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                            <X className="size-6" />
                        </button>
                    </div>
                    <div className="space-y-6 text-white/80">
                        {data.map((item, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest leading-none">
                                    <span>{item.label}</span>
                                    <span className="text-primary">{item.value}%</span>
                                </div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.value}%` }}
                                        transition={{ duration: 1, delay: idx * 0.1 }}
                                        className="h-full bg-primary shadow-[0_0_10px_#11d452]"
                                    />
                                </div>
                            </div>
                        ))}
                        <p className="text-sm font-light leading-relaxed mt-4">
                            Real-time biological resonance confirmed. Cellular metabolic rates are within optimal parameters for this growth phase.
                        </p>
                    </div>
                    <button onClick={onClose} className="mt-8 w-full py-4 bg-primary text-background-dark font-black tracking-widest uppercase rounded-xl hover:bg-primary/90 transition-all active:scale-95">
                        Close Analysis
                    </button>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

// --- Sub-components ---

const ProgressTracker = ({ currentStage }) => {
    const stages = ['Origin', 'Bloom', 'Harvest', 'Essence'];
    return (
        <div className="fixed left-6 md:left-12 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-8">
            <div className="text-[10px] font-bold uppercase tracking-[0.4em] rotate-180 [writing-mode:vertical-lr] text-black/20 dark:text-white/20">
                Stages of Evolution
            </div>
            <div className="w-px h-32 bg-black/10 dark:bg-white/10 relative">
                <motion.div
                    className="absolute top-0 left-0 w-full bg-primary shadow-[0_0_10px_#11d452]"
                    animate={{ height: `${(currentStage / 3) * 100}%` }}
                />
            </div>
            <div className="flex flex-col gap-4">
                {stages.map((stage, idx) => (
                    <div key={stage} className="group relative flex items-center">
                        <div
                            className={`size-2 rounded-full transition-all duration-500 ${currentStage === idx
                                    ? 'bg-primary scale-150 shadow-[0_0_10px_#11d452]'
                                    : 'bg-black/20 dark:bg-white/10'
                                }`}
                        />
                        <span className={`absolute left-6 text-[10px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap ${currentStage === idx ? 'text-primary opacity-100 translate-x-0' : 'text-transparent opacity-0 -translate-x-2'}`}>
                            {stage}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Navbar = () => (
    <header className="fixed top-0 w-full z-[80] flex items-center justify-between px-6 py-6 md:px-12 mix-blend-difference pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto cursor-pointer group">
            <div className="size-8 text-primary group-hover:rotate-90 transition-transform duration-500">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fill-rule="evenodd"></path>
                </svg>
            </div>
            <span className="text-white text-sm font-black tracking-[0.3em] uppercase">Evolve</span>
        </div>
        <nav className="hidden md:flex items-center gap-10 pointer-events-auto">
            {['Evolution', 'Science', 'Intelligence', 'Finality'].map(link => (
                <a key={link} className="text-white/50 hover:text-primary text-[10px] font-black tracking-widest transition-all uppercase hover:tracking-[0.2em]" href="#">{link}</a>
            ))}
        </nav>
        <button className="pointer-events-auto bg-primary text-background-dark px-8 py-3 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-primary/40">
            The Journey
        </button>
    </header>
);

// --- Sections ---

const Origin = () => {
    return (
        <div className="h-screen w-full relative flex items-center justify-center snap-start">
            <div className="absolute inset-0 z-0">
                <motion.img
                    initial={{ scale: 1.15, filter: "blur(10px)" }}
                    whileInView={{ scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    className="w-full h-full object-cover brightness-50"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCm8jkQ7j94N7J2Z_rED7MXUK3mPbVcBEy_GwqJO0zfgHpmxMZC9Dq-INYMD3lIDvyQLf4V9EFYaGkvujd8NMF7xpgOyM32VoX4wiwdmoyxCTk0RLI4-s047r5sajh0iNU0Uy3tF2QTdX6eSw1Fpwm5MgXEOyBZFz1j76NfPVYm7mFpdRfaNiJLlsmhFJTXZ87HuUyz0IhXXzDdBWytnY-H7D8NG3JaOnGeuxhjBmZF_FnkK_fiDy9ysj1WUdgMxR-_9YgfPG-hoWI"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-background-dark/30" />
            </div>

            <div className="relative z-10 container mx-auto px-6 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-white text-7xl md:text-[14rem] font-black tracking-tighter leading-none opacity-10 hover:opacity-20 transition-opacity duration-1000 select-none cursor-default">
                        ORIGIN
                    </h1>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-[-2rem] md:mt-[-5rem]"
                    >
                        <span className="text-primary text-glow text-xs md:text-sm font-black tracking-[1em] uppercase block">Chapter 01 : Prime</span>
                    </motion.div>
                </motion.div>

                <GlassCard className="max-w-xl w-full text-center">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="p-3 bg-primary/10 rounded-full"
                        >
                            <Zap className="text-primary size-6" />
                        </motion.div>
                        <h3 className="text-white font-black tracking-[0.2em] uppercase text-sm">Synthetic Intelligence</h3>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed font-light mb-8 max-w-sm mx-auto">
                        Encoded within this biological shell is the architecture of a global ecosystem. Precision-timed germination sequences are now active.
                    </p>
                    <div className="grid grid-cols-2 gap-8 text-left">
                        <div>
                            <span className="text-[10px] text-white/30 uppercase font-black tracking-[0.2em]">Viability</span>
                            <div className="text-primary text-2xl font-black">98.4%</div>
                        </div>
                        <div>
                            <span className="text-[10px] text-white/30 uppercase font-black tracking-[0.2em]">Resonance</span>
                            <div className="text-white text-2xl font-black italic">Active</div>
                        </div>
                    </div>
                </GlassCard>
            </div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-12 flex flex-col items-center gap-4 cursor-pointer"
            >
                <span className="text-white/40 text-[9px] font-black tracking-[0.5em] uppercase">Scroll to Evolve</span>
                <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
            </motion.div>
        </div>
    )
}

const Bloom = ({ onOpenAnalysis }) => {
    return (
        <div className="h-screen w-full relative flex items-center justify-center snap-start bg-background-light overflow-hidden">
            <div className="absolute inset-0 z-0">
                <motion.img
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    alt="Macro blossom" className="w-full h-full object-cover grayscale opacity-30 hover:grayscale-0 transition-all duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR5fYGzhh7X2XOOe9aKKDI35lLp4U_WHBod4hSzJNttBFnofAshd2hkM-Mf5fSjGQsHm_M6Yefh2ae9akISHyypdgqANqqlVY6DPK7qgSUvtaaUE-lwOPqUbTW3-14XibBPkAz51EzRwohEb8LxsZMDzFBMyZPXldIVpKaE88Bo2SIab0S1ruBqsFU3lJoZiCkTVmztcXzV5dIOC7wDqdaEAihBbn4R7w4LRVaS_GvsLtodCwqJYjXwiUONBSI-5svLONjWubSRQA" />
                <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-white/50" />
            </div>

            <div className="relative z-20 w-full max-w-7xl px-6 md:px-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 flex flex-col gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest w-fit border border-primary/30"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Phase 02 : The Bloom
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-7xl md:text-9xl font-black text-[#0d1b12] leading-[0.85] tracking-tighter"
                    >
                        THE <br /><span className="text-primary italic">AWAKENING</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="max-w-md text-lg text-[#0d1b12]/60 font-medium tracking-tight"
                    >
                        Biological stirring. The orchard wakes under the guidance of climate-synchronized synthetic rhythms.
                    </motion.p>

                    <div className="flex gap-6 items-center">
                        <button
                            onClick={() => onOpenAnalysis('Pollination Analysis', [{ label: 'Nectar Energy', value: 88 }, { label: 'Pollen Density', value: 94 }])}
                            className="group flex items-center gap-4 bg-primary text-background-dark px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:pr-8 transition-all active:scale-95"
                        >
                            Analyze
                            <ChevronRight className="size-4 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-5 h-[500px] flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        className="w-full bg-white/70 backdrop-blur-3xl p-10 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-white relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                        <div className="relative z-10 space-y-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-black text-[#0d1b12] tracking-tighter">Bio-Metrics</h3>
                                <Thermometer className="text-primary size-8" />
                            </div>

                            <div className="space-y-8">
                                {[
                                    { label: 'Thermal Index', value: 92, icon: Sun },
                                    { label: 'Moisture Lock', value: 78, icon: Droplet }
                                ].map((item, idx) => (
                                    <div key={item.label} className="space-y-3">
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-[#0d1b12]">
                                            <span className="flex items-center gap-2">
                                                <item.icon className="size-3 text-primary" />
                                                {item.label}
                                            </span>
                                            <span>{item.value}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-[#0d1b12]/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${item.value}%` }}
                                                transition={{ duration: 1.5, delay: idx * 0.2 }}
                                                className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(17,212,82,0.3)]"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

const Harvest = ({ onOpenAnalysis }) => {
    return (
        <div className="h-screen w-full relative bg-background-light flex flex-col items-center justify-center snap-start">
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary blur-[200px] rounded-full"></div>
                <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-yellow-400 blur-[180px] rounded-full"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="z-10 text-center max-w-4xl mb-20"
            >
                <span className="text-primary font-black tracking-[0.6em] uppercase text-[10px] mb-4 block">Stage 03 : Harvest</span>
                <h1 className="text-8xl md:text-[11rem] font-black tracking-tighter text-[#0d1b12] mb-8 leading-none">THE FRUIT</h1>
                <p className="text-xl text-[#4c9a66] font-bold tracking-tight max-w-xl mx-auto">
                    A masterpiece of biological engineering and sensory perfection.
                </p>
            </motion.div>

            <div className="relative z-10 w-full max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-3 flex flex-col gap-6 order-2 lg:order-1">
                    {[
                        { title: 'Nutrient Density', value: 'High', icon: Zap },
                        { title: 'Hydration index', value: '86%', icon: Droplet }
                    ].map((item, idx) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ x: 10, backgroundColor: 'rgba(17, 212, 82, 0.05)' }}
                            className="p-8 rounded-[2.5rem] bg-white shadow-xl flex flex-col gap-4 border border-black/5"
                        >
                            <item.icon className="text-primary size-8" />
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-widest text-black/40 mb-1">{item.title}</h3>
                                <p className="text-2xl font-black text-[#0d1b12]">{item.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="lg:col-span-6 flex items-center justify-center order-1 lg:order-2">
                    <div className="relative w-72 h-72 md:w-[500px] md:h-[500px] group">
                        <motion.div
                            animate={{ scale: [1, 1.02, 1], rotate: [0, 2, 0] }}
                            transition={{ duration: 8, repeat: Infinity }}
                            className="absolute inset-0 rounded-[5rem] bg-gradient-to-tr from-[#ff4d4d] to-[#f9cb28] shadow-[0_50px_100px_-30px_rgba(255,77,77,0.3)] border-[20px] border-white"
                        />
                        <div className="absolute inset-0 flex items-center justify-center p-12">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 10 }}
                                className="w-full h-full bg-cover bg-center rounded-[3rem] shadow-inner"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQk7x5KOeWlg2XNKcw5yIdx-uA_DcI2NabuHs_YdTCWzS_UOumqB_pUuYJVrHRzUQ6N4gl_Gj-Ux3oxO9JGAutkEQznhJUalE51SfVIPWXy25U1nAq6U6rDmS_-0TmXOzEGPCSTQ4dv1qxXyj1hVll385Hguy9nNVJBoKVARt1oifRbhF2rCiF_9jQZpsPYueUJY99WObA757hpSHx-aFdhbomug287HwaQHI3v89qeAq7A_ahAbm-EOJNZWKlYEYpfYrp_xm1qBw')" }}
                            />
                        </div>
                        <div className="absolute -top-6 -right-6 p-6 bg-primary text-background-dark rounded-full font-black text-xs uppercase tracking-widest shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
                            1.0x Macro
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3 flex flex-col gap-6 order-3">
                    <button
                        onClick={() => onOpenAnalysis('Sugar & Fiber Content', [{ label: 'Glucose Levels', value: 72 }, { label: 'Fiber Density', value: 92 }])}
                        className="h-40 bg-[#0d1b12] text-white p-8 rounded-[2.5rem] flex flex-col justify-end gap-3 hover:bg-primary hover:text-background-dark transition-all duration-500 active:scale-95 text-left group"
                    >
                        <ChevronRight className="size-6 mb-auto group-hover:translate-x-2 transition-transform" />
                        <h3 className="text-xs font-black uppercase tracking-widest opacity-60">Full Detail</h3>
                        <p className="text-xl font-black">View Profile</p>
                    </button>
                    <div className="p-8 rounded-[2.5rem] border-2 border-primary/20 flex flex-col gap-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#4c9a66]">Ripeness Index</span>
                        <div className="text-4xl font-black text-[#0d1b12]">100%</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Essence = () => {
    return (
        <div className="h-screen w-full relative bg-background-dark flex items-center justify-center snap-start overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, rgba(17, 212, 82, 0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
            <div className="absolute inset-0">
                <motion.div
                    animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#e0115f]/10 rounded-full blur-[150px]"
                />
                <motion.div
                    animate={{ x: [0, -40, 0], y: [0, -60, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[180px]"
                />
            </div>

            <div className="relative z-10 w-full max-w-7xl px-8 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-center mb-24"
                >
                    <span className="text-primary font-black tracking-[0.8em] uppercase text-[10px] mb-6 block">Stage 04 : Essence</span>
                    <h1 className="text-white text-8xl md:text-[13rem] font-black tracking-tighter mb-4 leading-none">ESSENCE</h1>
                    <p className="text-white/40 max-w-2xl mx-auto text-lg font-light tracking-wide leading-relaxed">
                        A molecular resonance. Where evolution reaches its final, perfected cellular state.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {[
                        { title: 'Quercetin Structure', desc: 'Antioxidant stabilizer', id: '#ID_QRT', icon: Wind, color: 'text-primary' },
                        { title: 'Vitamin C Synthesis', desc: 'Ascorbic concentrate', id: '#ID_VIT', icon: Zap, color: 'text-rose-500' },
                        { title: 'Fiber Lattice', desc: 'Structural chain integrity', id: '#ID_FBR', icon: Target, color: 'text-primary' }
                    ].map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.15 }}
                            whileHover={{ y: -15, backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(17, 212, 82, 0.4)' }}
                            className="group bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 transition-all duration-500 cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-10">
                                <card.icon className={`${card.color} size-8 group-hover:scale-125 transition-transform duration-500`} />
                                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{card.id}</span>
                            </div>
                            <h3 className="text-white text-3xl font-black mb-3 tracking-tighter group-hover:translate-x-2 transition-transform">{card.title}</h3>
                            <p className="text-white/40 text-sm mb-10 leading-relaxed group-hover:translate-x-2 transition-transform duration-500">{card.desc}</p>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '88%' }}
                                    className={`h-full ${card.color.replace('text', 'bg')} shadow-[0_0_15px_currentColor]`}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function App() {
    const [currentStage, setCurrentStage] = useState(0);
    const [modalData, setModalData] = useState({ isOpen: false, title: '', data: [] });
    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = (e) => {
            const { scrollTop, clientHeight } = e.target;
            const newStage = Math.min(3, Math.floor((scrollTop + clientHeight / 2) / clientHeight));
            setCurrentStage(newStage);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const openAnalysis = (title, data) => {
        setModalData({ isOpen: true, title, data });
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen relative font-display overflow-hidden selection:bg-primary/30">
            <Navbar />
            <ProgressTracker currentStage={currentStage} />

            <main
                ref={containerRef}
                className="h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth"
            >
                <Origin />
                <Bloom onOpenAnalysis={openAnalysis} />
                <Harvest onOpenAnalysis={openAnalysis} />
                <Essence />
            </main>

            <AnalysisModal
                isOpen={modalData.isOpen}
                onClose={() => setModalData(prev => ({ ...prev, isOpen: false }))}
                title={modalData.title}
                data={modalData.data}
            />

            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed bottom-0 w-full z-[80] p-8 flex items-end justify-between text-black/40 dark:text-white/40 pointer-events-none"
            >
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em]">
                        <span>Lat: 45.32° N</span>
                        <span className="h-3 w-px bg-current opacity-20"></span>
                        <span>Elev: 420m</span>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                        © 2024 naturetech labs
                    </div>
                </div>

                <div className="flex gap-4 pointer-events-auto">
                    <button className="size-14 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center hover:text-primary hover:border-primary/50 transition-all duration-500 hover:scale-110 active:scale-90">
                        <Volume2 className="size-5" />
                    </button>
                    <button className="size-14 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center hover:text-primary hover:border-primary/50 transition-all duration-500 hover:scale-110 active:scale-90">
                        <Share2 className="size-5" />
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="size-14 rounded-full bg-primary text-background-dark border border-primary flex items-center justify-center hover:bg-primary/80 transition-all duration-500 hover:scale-110 active:scale-90 shadow-2xl shadow-primary/20"
                    >
                        <RefreshCw className="size-5" />
                    </button>
                </div>
            </motion.footer>
        </div>
    );
}

export default App;
