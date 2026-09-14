import { type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDownRight,
  ArrowUpRight,
  Camera,
  Check,
  ChevronRight,
  Heart,
  LockKeyhole,
  MessageCircle,
  Plus,
  Sparkles,
  SunMedium,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';
import snapSoft from '@assets/Snapchat-95644675_1788460214186.jpg';
import snapRed from '@assets/Snapchat-543249386_1788460214186.jpg';
import photoBow from '@assets/IMG_20260729_234711_1788460214187.jpg';
import photoGold from '@assets/IMG_20260730_090304_1788460214188.jpg';
import eyesFixed from '@assets/IMG_20260904_002606_1788461962520.png';
import photoEyesBow from '@assets/Screenshot_2026_0903_232202_1788460214189.png';
import childhoodPhoto from '@assets/Screenshot_2026_0903_232202_1788461962552.png';
import chatOne from '@assets/Screenshot_20260713_234138_1788460859810.jpg';
import chatTwo from '@assets/Screenshot_20260713_234150_1788460859810.jpg';
import chatThree from '@assets/Screenshot_20260713_234224_1788460859811.jpg';
import chatFour from '@assets/Screenshot_20260713_234242_1788460859807.jpg';
import chatFive from '@assets/Screenshot_20260713_234255_1788460859808.jpg';
import chatSix from '@assets/Screenshot_20260713_234304_1788460859809.jpg';
import chatSeven from '@assets/Screenshot_20260713_234320_1788460859809.jpg';
import robloxKitchen from '@assets/Screenshot_20260705_201150_com.roblox.client_1788462163027.jpg';
import robloxGym from '@assets/Screenshot_20260705_201536_com.roblox.client_1788462163068.jpg';
import robloxBed from '@assets/Screenshot_20260705_201641_com.roblox.client_1788462163094.jpg';
import robloxFour from '@assets/Screenshot_20260705_202153_com.roblox.client_1788462163111.jpg';
import robloxFive from '@assets/Screenshot_20260705_202501_com.roblox.client_1788462163168.jpg';
import robloxSix from '@assets/Screenshot_20260705_202856_com.roblox.client_1788462163125.jpg';
import robloxSeven from '@assets/Screenshot_20260705_203158_com.roblox.client_1788462163139.jpg';
import robloxEight from '@assets/Screenshot_20260705_203405_com.roblox.client_1788462163153.jpg';

const queryClient = new QueryClient();

const photos = [
  { src: snapSoft, title: 'soft hours', note: 'a little snapshot of you', rotation: '-2deg' },
  { src: snapRed, title: 'red, naturally', note: 'you make every frame brighter', rotation: '2deg' },
  { src: photoBow, title: 'the bow era', note: 'main character, quietly', rotation: '-1deg' },
  { src: photoGold, title: 'golden hour', note: 'just you, being you', rotation: '2deg' },
  { src: eyesFixed, title: 'look at you', note: 'a tiny favorite', rotation: '-2deg' },
  { src: photoEyesBow, title: 'one more', note: 'because one more is never enough', rotation: '1deg' },
];

const childhoodMoment = {
  src: childhoodPhoto,
  title: 'little Amyra',
  note: 'before thirteen, still completely you',
  rotation: '-1deg',
};

const chatMoments = [
  { src: chatOne, title: 'the little beginning', note: '1% and already smiling', rotation: '-2deg' },
  { src: chatTwo, title: 'getting warmer', note: 'somewhere between 16 and 30%', rotation: '1deg' },
  { src: chatThree, title: 'sunny math', note: 'the kind of counting that matters', rotation: '-1deg' },
  { src: chatFour, title: 'halfway to forever', note: '46% → 60%', rotation: '2deg' },
  { src: chatFive, title: 'still not enough', note: '61% → 75%', rotation: '-2deg' },
  { src: chatSix, title: 'almost there', note: '76% → 90%', rotation: '1deg' },
  { src: chatSeven, title: 'the best kind of 100%', note: '100% and then some more', rotation: '-1deg' },
];

const robloxMoments = [
  { src: robloxKitchen, title: 'our little kitchen', note: 'making a home out of pixels', rotation: '-1deg' },
  { src: robloxGym, title: 'same team', note: 'even our workouts are together', rotation: '1deg' },
  { src: robloxBed, title: 'goodnight, next door', note: 'distance feels smaller here', rotation: '-1deg' },
  { src: robloxFour, title: 'just us', note: 'another ordinary day, made special', rotation: '1deg' },
  { src: robloxFive, title: 'doing life', note: 'our tiny world keeps growing', rotation: '-1deg' },
  { src: robloxSix, title: 'where we meet', note: 'two screens, one happy place', rotation: '1deg' },
  { src: robloxSeven, title: 'always an adventure', note: 'every little moment counts', rotation: '-1deg' },
  { src: robloxEight, title: 'home is a feeling', note: 'and somehow, it is us', rotation: '1deg' },
];

const wishes = [
  'I',
  'LOVE',
  'YOU',
  'AMYRA',
];

function jumpTo(id: string, behavior: ScrollBehavior = 'smooth') {
  const target = document.getElementById(id);
  if (!target) return;
  target.classList.add('is-visible');
  target.scrollIntoView({ behavior, block: 'start' });
}

function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos[number] | typeof childhoodMoment | typeof chatMoments[number] | typeof robloxMoments[number]) | null>(null);
  const [letterOpen, setLetterOpen] = useState(false);
  const [checkedWishes, setCheckedWishes] = useState<number[]>([]);
  const [celebrating, setCelebrating] = useState(false);
  const [kept, setKept] = useState(false);
  const celebrationTimer = useRef<number | null>(null);

  useEffect(() => {
    const section = window.location.hash.slice(1);
    if (section) {
      window.setTimeout(() => jumpTo(section, 'auto'), 0);
    }
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (typeof IntersectionObserver === 'undefined') {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealItems.forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${Math.min(index * 70, 420)}ms`);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (celebrationTimer.current !== null) {
        window.clearTimeout(celebrationTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const cursor = document.querySelector<HTMLElement>('[data-testid="cursor-heart"]');
    if (!cursor) return;

    const moveCursor = (event: PointerEvent) => {
      cursor.style.setProperty('--cursor-x', `${event.clientX}px`);
      cursor.style.setProperty('--cursor-y', `${event.clientY}px`);
    };
    const enterInteractive = () => cursor.classList.add('is-hovering');
    const leaveInteractive = () => cursor.classList.remove('is-hovering');

    window.addEventListener('pointermove', moveCursor);
    document.querySelectorAll('button, a').forEach((element) => {
      element.addEventListener('pointerenter', enterInteractive);
      element.addEventListener('pointerleave', leaveInteractive);
    });

    return () => {
      window.removeEventListener('pointermove', moveCursor);
      document.querySelectorAll('button, a').forEach((element) => {
        element.removeEventListener('pointerenter', enterInteractive);
        element.removeEventListener('pointerleave', leaveInteractive);
      });
    };
  }, []);

  const celebrate = () => {
    setCelebrating(true);
    if (celebrationTimer.current !== null) {
      window.clearTimeout(celebrationTimer.current);
    }
    celebrationTimer.current = window.setTimeout(() => {
      setCelebrating(false);
      celebrationTimer.current = null;
    }, 1500);
  };

  const toggleWish = (index: number) => {
    setCheckedWishes((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );
  };

  return (
    <main className="page-grain relative min-h-[100dvh] bg-[#f4eee5] text-[#382541]">
      {celebrating && (
        <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, index) => (
            <span
              key={index}
              className="confetti-piece"
              style={{
                left: `${30 + ((index * 17) % 40)}%`,
                top: '44%',
                background: ['#f36b4f', '#edc85d', '#8dbbad', '#7d527e'][index % 4],
                ['--x' as string]: `${(index % 2 ? 1 : -1) * (35 + (index * 13) % 110)}px`,
                ['--y' as string]: `${80 + (index * 9) % 120}px`,
              }}
            />
          ))}
        </div>
      )}
      <div className="birthday-atmosphere" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} className={`atmosphere-piece atmosphere-piece-${(index % 6) + 1}`}>
            {index % 5 === 0 ? '♥' : index % 4 === 0 ? '✦' : ''}
          </span>
        ))}
      </div>
      <div className="cursor-heart" data-testid="cursor-heart" aria-hidden="true">
        <Heart size={18} fill="currentColor" strokeWidth={1.5} />
      </div>

      <header className="absolute left-0 right-0 top-0 z-20 px-5 py-5 sm:px-8 lg:px-12" data-testid="header-site">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between">
          <button
            className="group flex items-center gap-3"
            onClick={() => jumpTo('top')}
            data-testid="button-home"
            aria-label="Back to the top"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f7e9d9]/40 bg-[#f7e9d9]/10 font-mono-custom text-xs text-[#f7e9d9] transition group-hover:rotate-12 group-hover:bg-[#edc85d] group-hover:text-[#382541]">A</span>
            <span className="hidden font-mono-custom text-[10px] uppercase tracking-[.22em] text-[#f7e9d9]/70 sm:block">a tiny keepsake</span>
          </button>
          <nav className="flex items-center gap-5 sm:gap-8" aria-label="Page sections">
            <button className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[#f7e9d9]/70 transition hover:text-[#edc85d]" onClick={() => jumpTo('letter')} data-testid="button-nav-letter">the letter</button>
            <button className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-[#f7e9d9]/70 transition hover:text-[#edc85d]" onClick={() => jumpTo('archive')} data-testid="button-nav-archive">little archive</button>
              <button className="hidden font-mono-custom text-[10px] uppercase tracking-[.16em] text-[#f7e9d9]/70 transition hover:text-[#edc85d] md:block" onClick={() => jumpTo('sunny-chat')} data-testid="button-nav-sunny-chat">sunny chat</button>
              <button className="hidden font-mono-custom text-[10px] uppercase tracking-[.16em] text-[#f7e9d9]/70 transition hover:text-[#edc85d] lg:block" onClick={() => jumpTo('roblox')} data-testid="button-nav-our-world">our world</button>
            <button className="hidden rounded-full border border-[#f7e9d9]/40 px-4 py-2 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[#f7e9d9] transition hover:border-[#edc85d] hover:bg-[#edc85d] hover:text-[#382541] sm:block" onClick={celebrate} data-testid="button-nav-celebrate">make a wish</button>
          </nav>
        </div>
      </header>

      <section id="top" className="relative min-h-[760px] overflow-hidden bg-[#382541] px-5 pb-20 pt-36 text-[#f7e9d9] sm:min-h-[850px] sm:px-10 lg:px-16" data-testid="section-hero">
        <div className="absolute -right-32 top-20 h-[500px] w-[500px] rounded-full border border-[#edc85d]/20 sm:h-[700px] sm:w-[700px]" />
        <div className="absolute -right-16 top-36 h-[380px] w-[380px] rounded-full border border-[#edc85d]/10 sm:h-[560px] sm:w-[560px]" />
        <div className="absolute bottom-[-7rem] left-[-8rem] h-[22rem] w-[22rem] rounded-full bg-[#f36b4f] opacity-90 blur-3xl" />
        <div className="hero-doodles" aria-hidden="true">
          <span className="hero-doodle hero-doodle-one">♥</span>
          <span className="hero-doodle hero-doodle-two">✦</span>
          <span className="hero-doodle hero-doodle-three">♡</span>
        </div>
        <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-6">
          <div className="relative z-10 max-w-[740px]">
            <p className="reveal font-mono-custom text-[10px] uppercase tracking-[.32em] text-[#f36b4f]" data-testid="text-proposal-label">a birthday keepsake for amyra</p>
            <p className="reveal font-mono-custom text-[10px] uppercase tracking-[.32em] text-[#edc85d]" data-testid="text-hero-kicker">september 22 · a little note for</p>
            <h1 className="reveal reveal-delay-1 mt-5 font-display text-[clamp(4.8rem,15vw,12.5rem)] font-semibold leading-[.78] tracking-[-.075em]" data-testid="text-hero-name">
              Amyra<span className="text-[#f36b4f]">.</span>
            </h1>
            <p className="reveal reveal-delay-2 mt-8 max-w-[470px] font-display text-[clamp(1.55rem,3.2vw,2.55rem)] leading-[1.08] text-[#f7e9d9]" data-testid="text-hero-message">
              Thirteen looks like it was made for you.
            </p>
            <div className="reveal reveal-delay-3 mt-10 flex flex-wrap items-center gap-5">
              <button onClick={() => jumpTo('letter')} className="group flex items-center gap-3 rounded-full bg-[#edc85d] px-5 py-3 font-mono-custom text-[10px] uppercase tracking-[.15em] text-[#382541] transition hover:-translate-y-1 hover:bg-[#f7e9d9]" data-testid="button-open-letter">
                open your letter <ArrowDownRight size={15} strokeWidth={1.8} className="transition group-hover:translate-y-1" />
              </button>
              <span className="font-mono-custom text-[10px] uppercase tracking-[.14em] text-[#f7e9d9]/50" data-testid="text-hero-signature">from Ash, who calls you<br />Amuu&lt;3 and Lilie</span>
            </div>
          </div>

          <div className="relative mx-auto h-[390px] w-full max-w-[500px] sm:h-[510px]" data-testid="hero-photo-collage">
            <div className="photo-float absolute left-[5%] top-[12%] z-10 h-[260px] w-[195px] overflow-hidden border-[7px] border-[#f7e9d9] bg-[#f7e9d9] shadow-[0_24px_55px_rgba(0,0,0,.26)] sm:h-[345px] sm:w-[255px]">
              <img src={snapSoft} alt="Amyra in a soft pink portrait" className="h-full w-full object-cover" data-testid="img-hero-soft" />
            </div>
            <div className="photo-float-two absolute bottom-[2%] right-[3%] z-20 h-[250px] w-[190px] overflow-hidden border-[7px] border-[#f7e9d9] bg-[#f7e9d9] shadow-[0_24px_55px_rgba(0,0,0,.26)] sm:h-[330px] sm:w-[250px]">
              <img src={photoBow} alt="Amyra with a pink bow filter" className="h-full w-full object-cover" data-testid="img-hero-bow" />
            </div>
            <span className="absolute bottom-[3%] left-[3%] z-30 flex h-20 w-20 -rotate-12 items-center justify-center rounded-full bg-[#edc85d] text-center font-display text-lg leading-[.9] text-[#382541] shadow-lg sm:bottom-[5%]" data-testid="badge-birthday">13<br />today</span>
            <span className="absolute right-[4%] top-[3%] z-30 -rotate-6 font-display text-3xl text-[#f36b4f]" aria-hidden="true">a little love</span>
          </div>
        </div>
        <button onClick={() => jumpTo('letter')} className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono-custom text-[9px] uppercase tracking-[.22em] text-[#f7e9d9]/50 transition hover:text-[#edc85d] sm:flex" data-testid="button-scroll-letter">
          keep going <ArrowDownRight size={14} />
        </button>
      </section>

      <div className="overflow-hidden border-b border-[#382541]/15 bg-[#f36b4f] py-3 text-[#382541]" data-testid="ribbon-birthday">
        <div className="ribbon-track font-mono-custom text-[10px] uppercase tracking-[.25em]">
          <div className="ribbon-group">
            <span>amyra is thirteen</span><span className="text-[#f7e9d9]">*</span><span>september 22</span><span>this page is yours</span><span className="text-[#f7e9d9]">*</span>
          </div>
          <div className="ribbon-group" aria-hidden="true">
            <span>amyra is thirteen</span><span className="text-[#f7e9d9]">*</span><span>september 22</span><span>this page is yours</span><span className="text-[#f7e9d9]">*</span>
          </div>
        </div>
      </div>

      <section id="letter" className="scroll-reveal relative scroll-mt-8 px-5 py-24 sm:px-10 sm:py-36 lg:px-16" data-reveal data-testid="section-letter">
        <div className="letter-doodles" aria-hidden="true">
          <span className="letter-doodle letter-doodle-one">♡</span>
          <span className="letter-doodle letter-doodle-two">✦</span>
          <span className="letter-doodle letter-doodle-three">♥</span>
        </div>
        <div className="mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div>
            <p className="font-mono-custom text-[10px] uppercase tracking-[.28em] text-[#f36b4f]" data-testid="text-letter-kicker">01 / the important part</p>
            <h2 className="mt-5 max-w-[370px] font-display text-[clamp(3rem,7vw,6.5rem)] leading-[.86] tracking-[-.06em]" data-testid="text-letter-heading">For<br /><em className="text-[#f36b4f]">Amuu&lt;3</em></h2>
            <p className="mt-8 max-w-[300px] text-sm leading-7 text-[#382541]/65" data-testid="text-letter-intro">Some things deserve more than a quick message. So this is your small corner of the internet, saved here for whenever you want it.</p>
            <div className="mt-10 flex items-center gap-3 text-[#382541]/50">
              <LockKeyhole size={15} strokeWidth={1.5} />
              <span className="font-mono-custom text-[9px] uppercase tracking-[.16em]">private, but not secret</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-3 -top-3 h-10 w-10 border-l border-t border-[#f36b4f]" />
            <article className="letter-paper letter-interactive relative border border-[#382541]/15 px-6 py-9 shadow-[0_20px_60px_rgba(56,37,65,.08)] sm:px-14 sm:py-12" data-testid="card-letter">
              <div className="flex items-center justify-between border-b border-[#382541]/15 pb-5">
                <span className="font-mono-custom text-[9px] uppercase tracking-[.2em] text-[#f36b4f]">a note, dated september 22</span>
                <Heart size={17} fill="currentColor" className="letter-heart text-[#f36b4f]" aria-hidden="true" />
              </div>
              <div className="pt-8 font-display text-[1.6rem] leading-[1.45] sm:text-[2rem]" data-testid="text-letter-body">
                <p>Hi Lilie, jo kuch bhi main abhi likhne wala hoon, I really want you thoda sa time nikaal kar ise padhna. Aur main ye Hindi mein likhne wala hoon, coz I believe ki ye mere liye best language hogi apni feelings express karne ke liye.</p>
                {letterOpen && (
                  <div className="letter-reveal reveal">
                    <p className="mt-7">Actually, mujhe is din ka sachhi mein kitne dino se intezaar tha, main bata bhi nahi sakta. And you know what? Aaj main actually bahut khush hoon, coz ye aapka first birthday hai jo aap mere saath mana rahi ho... 🥹❤️</p>
                    <p className="mt-7">Idk hum kitne time se saath hain, kyuki mujhe pata hi nahi chalta ki aapse baat karte hue kab time beet jaata hai. Honestly, I love you so much, more than words can express. Aur din pe din main aapke saath aur comfortable feel karne laga hoon. Like, mere mann mein jo bhi baat hoti hai, main aapko bina kisi second thought ke bata deta hoon.</p>
                    <p className="mt-7">And you know what? Mujhe bahut achha lagta hai jab main ye yaad karta hoon ki mere paas sirf ek GF nahi hai, I have a future wife who cares about me. ❤️</p>
                    <p className="mt-7">Aur aapko pata hai, I still remember woh saare moments jab humne saath mein itna fun kiya tha. 🥹❤️ Jab bhi main un moments ke baare mein sochta hoon na, main thoda sa blush karne lagta hoon hehe. Pata nahi aapke saath aisa kya hai, but aapki chhoti-chhoti baatein bhi mere face pe automatically smile le aati hain.</p>
                    <p className="mt-7">Aur jis din aapse baat karke sota hoon na... ayye haye 😭❤️ real wala good night ho jaata hai hehe. Pata nahi kyun, but aapse baat karne ke baad ek alag hi sukoon milta hai. Jaise din chahe jaisa bhi gaya ho, end mein aapse baat ho jaaye toh sab achha lagne lagta hai.</p>
                    <p className="mt-7">You know what, main likhna toh bahut kuch chahta hoon, par words hi kam pad rahe hain. Aur waise bhi, abhi toh bahut time hai... 🥹</p>
                    <p className="mt-7">Ik aapko mazaak lag raha hoga, but ye likhte time main actually emotional ho raha hoon. Main bata bhi nahi sakta ki mujhe kitna achha feel ho raha hai...</p>
                    <p className="mt-7"><strong>HAPPY BIRTHDAY, MY LOVE, MY LIFE, MY AMMUUUU &lt;3</strong> 🫶🏻❤️</p>
                    <p className="mt-7">Bahut log bolte hain ki same person se roz baat karte-karte eventually bore ho jaate ho, but in your case, Lilie, I can talk to you for years and still never get bored. Aur waise bhi, main aapse kabhi bore nahi ho sakta, coz din pe din mera attraction aur bhi badhta ja raha hai. 😭❤️</p>
                    <p className="mt-7">Are yaar, main ruk hi nahi paa raha... Itna bada ho gaya hai ki shayad aap poora padho bhi nahi 😂😭</p>
                    <p className="mt-7">Chhod do, bas ek reminder de doon:</p>
                    <p className="mt-7"><strong>I loved you even before I knew your name.</strong> 🫶🏻</p>
                    <p className="mt-7">Hehe... again,</p>
                    <p className="mt-7 text-[#f36b4f]"><strong>HAPPY BIRTHDAY, AMYRA ❤️🫶🏻</strong></p>
                  </div>
                )}
              </div>
              <button onClick={() => setLetterOpen((current) => !current)} aria-expanded={letterOpen} className="cute-button mt-9 flex items-center gap-2 border-b border-[#f36b4f] pb-1 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[#f36b4f] transition hover:border-[#382541] hover:text-[#382541]" data-testid="button-toggle-letter">
                {letterOpen ? 'fold the letter' : 'read the rest'} <ChevronRight size={14} className={letterOpen ? 'rotate-90' : ''} />
              </button>
            </article>
          </div>
        </div>
      </section>

      <section id="childhood" className="scroll-reveal relative overflow-hidden bg-[#edc85d] px-5 py-24 text-[#382541] sm:px-10 sm:py-32 lg:px-16" data-reveal data-testid="section-childhood">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-[#382541]/15" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="font-mono-custom text-[10px] uppercase tracking-[.28em] text-[#f36b4f]" data-testid="text-childhood-kicker">02 / before the nicknames</p>
            <h2 className="mt-5 max-w-[500px] font-display text-[clamp(3.2rem,8vw,7rem)] leading-[.83] tracking-[-.06em]" data-testid="text-childhood-heading">little you,<br /><em className="text-[#f36b4f]">big heart.</em></h2>
            <p className="mt-8 max-w-[330px] text-sm leading-7 text-[#382541]/70" data-testid="text-childhood-copy">Before Amuu&lt;3. Before Lilie. Just a tiny girl with the same eyes and the same special kind of light.</p>
            <div className="mt-10 flex items-center gap-3 text-[#382541]/60">
              <Heart size={15} fill="currentColor" strokeWidth={1.5} />
              <span className="font-mono-custom text-[9px] uppercase tracking-[.16em]" data-testid="text-childhood-caption">every version of you is my favorite</span>
            </div>
          </div>
          <button onClick={() => setSelectedPhoto(childhoodMoment)} className="childhood-frame group relative mx-auto block w-full max-w-[560px] rotate-[-1deg] bg-[#f7e9d9] p-3 text-left shadow-[0_24px_55px_rgba(56,37,65,.2)] transition hover:rotate-0 hover:shadow-[0_30px_65px_rgba(56,37,65,.27)]" data-testid="button-childhood-photo" aria-label="Open childhood photo of Amyra">
            <img src={childhoodMoment.src} alt="Amyra as a little child" className="h-auto w-full transition duration-500 group-hover:scale-[1.015]" data-testid="img-childhood" />
            <span className="absolute bottom-7 left-7 bg-[#f36b4f] px-4 py-2 font-display text-lg text-[#f7e9d9]" data-testid="text-childhood-photo-label">our little star</span>
          </button>
        </div>
      </section>

      <section id="eyes" className="scroll-reveal relative overflow-hidden bg-[#f4eee5] px-5 py-24 sm:px-10 sm:py-32 lg:px-16" data-reveal data-testid="section-eyes">
        <div className="relative mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-24">
          <button onClick={() => setSelectedPhoto({ src: eyesFixed, title: 'your eyes', note: 'the view I never get tired of', rotation: '0deg' })} className="eyes-frame group relative mx-auto block w-full max-w-[680px] overflow-hidden border-[7px] border-[#382541] bg-[#382541] text-left shadow-[0_25px_60px_rgba(56,37,65,.18)]" data-testid="button-eyes-photo" aria-label="Open the photo of Amyra's eyes">
            <img src={eyesFixed} alt="Amyra's eyes" className="h-auto w-full transition duration-700 group-hover:scale-[1.035]" data-testid="img-eyes-fixed" />
            <span className="absolute bottom-4 left-4 bg-[#edc85d] px-3 py-2 font-mono-custom text-[9px] uppercase tracking-[.15em] text-[#382541]">a closer look</span>
          </button>
          <div>
            <p className="font-mono-custom text-[10px] uppercase tracking-[.28em] text-[#f36b4f]" data-testid="text-eyes-kicker">03 / the view I keep</p>
            <blockquote className="mt-6 font-display text-[clamp(2.7rem,6vw,5.8rem)] leading-[.9] tracking-[-.06em] text-[#382541]" data-testid="text-eyes-quote">“every time I look into your eyes, my heart melts a little.”</blockquote>
            <div className="mt-8 flex items-center gap-3 text-[#382541]/55">
              <span className="h-px w-10 bg-[#f36b4f]" />
              <span className="font-mono-custom text-[9px] uppercase tracking-[.18em]" data-testid="text-eyes-signature">from Ash, always</span>
            </div>
          </div>
        </div>
      </section>

      <section id="archive" className="scroll-reveal scroll-mt-8 bg-[#d8e7df] px-5 py-24 sm:px-10 sm:py-32 lg:px-16" data-reveal data-testid="section-archive">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono-custom text-[10px] uppercase tracking-[.28em] text-[#f36b4f]" data-testid="text-archive-kicker">04 / little archive</p>
              <h2 className="mt-4 font-display text-[clamp(3.2rem,8vw,7rem)] leading-[.83] tracking-[-.06em]" data-testid="text-archive-heading">you, in<br /><em className="text-[#f36b4f]">frames.</em></h2>
            </div>
            <div className="max-w-[260px] sm:pb-1"><p className="text-sm leading-6 text-[#382541]/65" data-testid="text-archive-intro">A few favorite glimpses, kept close. There is always space here for the next one.</p></div>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:mt-20 lg:grid-cols-12 lg:gap-6" data-testid="gallery-photos">
            {photos.map((photo, index) => (
              <button
                key={photo.title}
                onClick={() => setSelectedPhoto(photo)}
                className={`gallery-card group relative overflow-hidden bg-[#f7e9d9] text-left ${index === 0 ? 'lg:col-span-5 lg:row-span-2' : index === 1 ? 'lg:col-span-3' : index === 2 ? 'lg:col-span-4' : index === 3 ? 'lg:col-span-4' : index === 4 ? 'lg:col-span-3' : 'lg:col-span-5'}`}
                style={{ transform: `rotate(${photo.rotation})` }}
                data-testid={`button-gallery-${index}`}
                aria-label={`Open photo: ${photo.title}`}
              >
                  <div className={`gallery-photo-wrap relative ${index === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
                  <img src={photo.src} alt={`Amyra, ${photo.title}`} className="gallery-img h-full w-full object-cover" data-testid={`img-gallery-${index}`} />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#382541]/75 to-transparent px-4 pb-4 pt-14 text-[#f7e9d9] opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="font-mono-custom text-[9px] uppercase tracking-[.15em]">{photo.note}</span>
                  </div>
                  <span className="gallery-arrow absolute right-3 top-3 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-[#f7e9d9]/90 text-[#382541] opacity-0 transition-opacity group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight size={15} /></span>
                </div>
              </button>
            ))}
            <button onClick={() => setKept(true)} className="group flex aspect-[4/3] flex-col items-start justify-between border border-dashed border-[#382541]/35 p-4 text-left transition hover:border-[#f36b4f] hover:bg-[#f7e9d9]/35 sm:p-5 lg:col-span-4" data-testid="button-add-moment">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#382541]/30 transition group-hover:rotate-90 group-hover:bg-[#edc85d]"><Plus size={17} strokeWidth={1.5} /></span>
              <span><span className="block font-display text-2xl leading-none">room for<br />another moment</span><span className="mt-2 block font-mono-custom text-[9px] uppercase tracking-[.12em] text-[#382541]/55">{kept ? 'saved for later' : 'leave this one empty'}</span></span>
            </button>
          </div>
        </div>
      </section>

      <section id="sunny-chat" className="scroll-reveal relative scroll-mt-8 overflow-hidden bg-[#382541] px-5 py-24 text-[#f7e9d9] sm:px-10 sm:py-32 lg:px-16" data-reveal data-testid="section-sunny-chat">
        <div className="absolute -left-24 top-16 h-56 w-56 rounded-full border border-[#edc85d]/20" aria-hidden="true" />
        <div className="absolute -right-32 bottom-[-7rem] h-96 w-96 rounded-full border border-[#edc85d]/20" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1320px]">
          <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-3 text-[#edc85d]">
                <SunMedium size={17} strokeWidth={1.5} />
                <p className="font-mono-custom text-[10px] uppercase tracking-[.28em]" data-testid="text-chat-kicker">05 / a happy sunny chat</p>
              </div>
              <h2 className="mt-5 max-w-[800px] font-display text-[clamp(3.2rem,8vw,7rem)] leading-[.83] tracking-[-.06em]" data-testid="text-chat-heading">our little<br /><em className="text-[#f36b4f]">100%.</em></h2>
            </div>
            <div className="max-w-[280px] sm:pb-1">
              <p className="text-sm leading-6 text-[#f7e9d9]/65" data-testid="text-chat-intro">A tiny chat that turned love into a number, then kept going long after the number ran out.</p>
            </div>
          </div>
          <div className="mt-14 grid grid-cols-2 items-start gap-5 sm:grid-cols-3 sm:gap-7 lg:mt-20 lg:grid-cols-7 lg:gap-5" data-testid="gallery-chat">
            {chatMoments.map((moment, index) => (
              <button
                key={moment.title}
                onClick={() => setSelectedPhoto(moment)}
                className="chat-card group relative text-left transition duration-300 hover:-translate-y-2"
                style={{ transform: `rotate(${moment.rotation})` }}
                data-testid={`button-chat-${index}`}
                aria-label={`Open chat moment: ${moment.title}`}
              >
                  <div className="chat-photo-wrap relative overflow-hidden border-[5px] border-[#f7e9d9] bg-[#f7e9d9] p-1 shadow-[0_20px_40px_rgba(0,0,0,.25)]">
                   <div className="aspect-[9/19] overflow-hidden bg-black">
                    <img src={moment.src} alt={`Chat moment, ${moment.title}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" data-testid={`img-chat-${index}`} />
                  </div>
                  <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#edc85d] text-[#382541] opacity-0 transition group-hover:opacity-100" aria-hidden="true"><ArrowUpRight size={14} /></span>
                </div>
                <p className="mt-4 font-display text-xl leading-none text-[#f7e9d9]" data-testid={`text-chat-title-${index}`}>{moment.title}</p>
                <p className="mt-2 font-mono-custom text-[9px] uppercase tracking-[.13em] text-[#f7e9d9]/45" data-testid={`text-chat-note-${index}`}>{moment.note}</p>
              </button>
            ))}
          </div>
          <div className="mt-16 flex items-center gap-3 border-t border-[#f7e9d9]/15 pt-5 text-[#f7e9d9]/55">
            <MessageCircle size={15} strokeWidth={1.5} />
            <span className="font-mono-custom text-[9px] uppercase tracking-[.18em]" data-testid="text-chat-footer">some conversations become little time capsules</span>
          </div>
        </div>
      </section>

      <section id="roblox" className="scroll-reveal relative overflow-hidden bg-[#d8e7df] px-5 py-24 text-[#382541] sm:px-10 sm:py-32 lg:px-16" data-reveal data-testid="section-roblox">
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full border border-[#382541]/15" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1320px]">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_.72fr] lg:gap-24">
            <div>
              <div className="flex items-center gap-3 text-[#f36b4f]">
                <MessageCircle size={17} strokeWidth={1.5} />
                <p className="font-mono-custom text-[10px] uppercase tracking-[.28em]" data-testid="text-roblox-kicker">06 / the world we made</p>
              </div>
              <h2 className="mt-5 max-w-[800px] font-display text-[clamp(3.2rem,8vw,7rem)] leading-[.83] tracking-[-.06em]" data-testid="text-roblox-heading">a whole life<br /><em className="text-[#f36b4f]">in pixels.</em></h2>
            </div>
            <p className="max-w-[330px] text-sm leading-7 text-[#382541]/70" data-testid="text-roblox-intro">Long distance can keep two people in different places. It cannot stop two hearts from making a home wherever they meet.</p>
          </div>
          <div className="mt-12 max-w-[760px] font-display text-[1.5rem] leading-[1.35] sm:mt-16 sm:text-[2rem]" data-testid="text-roblox-letter">
            <p>Somewhere between the screens, we made a tiny world of our own. We cooked, played, got sleepy, and did ordinary life together.</p>
                  <p className="mt-5 text-[#f36b4f]">It may be a game, but what we have is real.</p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4" data-testid="gallery-roblox">
            {robloxMoments.map((moment, index) => (
              <button
                key={moment.title}
                onClick={() => setSelectedPhoto(moment)}
                className="roblox-card group relative overflow-hidden border-[5px] border-[#f7e9d9] bg-[#f7e9d9] text-left shadow-[0_16px_35px_rgba(56,37,65,.13)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_23px_45px_rgba(56,37,65,.2)]"
                data-testid={`button-roblox-${index}`}
                aria-label={`Open Roblox memory: ${moment.title}`}
              >
                <div className="roblox-photo-wrap aspect-[16/9] overflow-hidden bg-[#382541]">
                  <img src={moment.src} alt={`Roblox memory, ${moment.title}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" data-testid={`img-roblox-${index}`} />
                </div>
                <div className="flex items-end justify-between gap-3 p-4">
                  <div>
                    <p className="font-display text-xl leading-none" data-testid={`text-roblox-title-${index}`}>{moment.title}</p>
                    <p className="mt-2 font-mono-custom text-[9px] uppercase tracking-[.12em] text-[#382541]/55" data-testid={`text-roblox-note-${index}`}>{moment.note}</p>
                  </div>
                  <ArrowUpRight size={16} className="shrink-0 text-[#f36b4f] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4eee5] px-5 py-24 sm:px-10 sm:py-32 lg:px-16" data-testid="section-wishes">
        <div className="mx-auto grid max-w-[1120px] gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-28">
          <div>
            <p className="font-mono-custom text-[10px] uppercase tracking-[.28em] text-[#f36b4f]" data-testid="text-wishes-kicker">07 / for the year ahead</p>
            <h2 className="mt-5 font-display text-[clamp(3rem,7vw,6rem)] leading-[.88] tracking-[-.06em]" data-testid="text-wishes-heading">complete this for me lilie</h2>
            <button onClick={celebrate} className="relative mt-10 flex items-center gap-3 rounded-full bg-[#382541] px-5 py-3 font-mono-custom text-[10px] uppercase tracking-[.14em] text-[#f7e9d9] transition hover:-translate-y-1 hover:bg-[#f36b4f]" data-testid="button-celebrate">
              <Sparkles size={15} /> send a little sparkle
              <span className="celebration-ring absolute inset-0 rounded-full border border-[#f36b4f]" aria-hidden="true" />
            </button>
          </div>
          <div className="border-t border-[#382541]/20" data-testid="list-wishes">
            {wishes.map((wish, index) => {
              const done = checkedWishes.includes(index);
              return (
                <button key={wish} onClick={() => toggleWish(index)} className={`wish-row flex w-full items-center gap-5 border-b border-[#382541]/20 py-6 text-left ${done ? 'is-done' : ''}`} data-testid={`button-wish-${index}`}>
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition ${done ? 'border-[#f36b4f] bg-[#f36b4f] text-[#f7e9d9]' : 'border-[#382541]/35 text-transparent'}`}><Check size={14} /></span>
                  <span className="font-display text-[1.45rem] leading-tight sm:text-[1.8rem]" data-testid={`text-wish-${index}`}>{wish}</span>
                  <ChevronRight size={17} className="ml-auto shrink-0 text-[#f36b4f]" />
                </button>
              );
            })}
            <p className="mt-5 font-mono-custom text-[9px] uppercase tracking-[.16em] text-[#382541]/50" data-testid="text-wishes-progress">{checkedWishes.length} of {wishes.length} wishes held close</p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f36b4f] px-5 py-24 text-[#382541] sm:px-10 sm:py-32 lg:px-16" data-testid="section-finale">
        <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border-[1px] border-[#382541]/20" />
        <div className="absolute -right-4 -top-12 h-40 w-40 rounded-full border-[1px] border-[#382541]/20" />
        <div className="relative mx-auto max-w-[900px] text-center">
          <Camera className="mx-auto mb-7" size={24} strokeWidth={1.5} aria-hidden="true" />
          <p className="font-mono-custom text-[10px] uppercase tracking-[.28em]" data-testid="text-finale-kicker">and because birthdays should be saved</p>
          <h2 className="mt-5 font-display text-[clamp(3.6rem,10vw,9rem)] leading-[.8] tracking-[-.07em]" data-testid="text-finale-heading">keep this<br /><em>little love.</em></h2>
          <p className="mx-auto mt-8 max-w-[420px] text-sm leading-6 text-[#382541]/70" data-testid="text-finale-copy">Come back whenever you need a reminder: you are loved, you are growing, and thirteen is only the beginning.</p>
          <button onClick={() => setKept(true)} className="mt-9 inline-flex items-center gap-3 border-b border-[#382541] pb-2 font-mono-custom text-[10px] uppercase tracking-[.16em] transition hover:gap-5" data-testid="button-keep-page">
            {kept ? 'saved in your heart' : 'make it a keepsake'} <Heart size={15} fill="currentColor" />
          </button>
        </div>
      </section>

      <footer className="flex flex-col items-center justify-between gap-4 bg-[#382541] px-5 py-7 text-[#f7e9d9] sm:flex-row sm:px-10 lg:px-16" data-testid="footer-site">
        <span className="font-mono-custom text-[9px] uppercase tracking-[.2em] text-[#f7e9d9]/60" data-testid="text-footer-date">made for september 22</span>
        <span className="font-display text-xl" data-testid="text-footer-signoff">happy birthday, Amyra<span className="text-[#f36b4f]">.</span> <span className="text-[#f7e9d9]/60">— Ash</span></span>
        <button onClick={() => jumpTo('top')} className="flex items-center gap-2 font-mono-custom text-[9px] uppercase tracking-[.2em] text-[#f7e9d9]/60 transition hover:text-[#edc85d]" data-testid="button-back-top">back to the top <ArrowUpRight size={14} /></button>
      </footer>

      {selectedPhoto && (
        <div className="modal-backdrop fixed inset-0 z-40 flex items-center justify-center bg-[#382541]/90 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`Viewing ${selectedPhoto.title}`} data-testid="modal-photo">
          <button onClick={() => setSelectedPhoto(null)} className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#f7e9d9]/35 text-[#f7e9d9] transition hover:rotate-90 hover:bg-[#f7e9d9] hover:text-[#382541]" data-testid="button-close-photo" aria-label="Close photo"><X size={19} /></button>
          <div className="max-h-[90vh] max-w-[min(90vw,560px)] text-center">
            <img src={selectedPhoto.src} alt={`Amyra, ${selectedPhoto.title}`} className="max-h-[76vh] w-auto object-contain shadow-2xl" data-testid="img-photo-modal" />
            <p className="mt-5 font-display text-2xl text-[#f7e9d9]" data-testid="text-photo-modal-title">{selectedPhoto.title}</p>
            <p className="mt-1 font-mono-custom text-[9px] uppercase tracking-[.18em] text-[#edc85d]">{selectedPhoto.note}</p>
          </div>
        </div>
      )}
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;