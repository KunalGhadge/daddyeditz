import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";

const reviews = [
  {
    name: "Riya Mehta",
    username: "@riyacreates",
    body: "SharonRaj turned our raw restaurant footage into something cinematic. We gained 800 followers in a week and our orders spiked on weekends.",
    profile: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Aditya Shinde",
    username: "@adityafit",
    body: "The gym reel he made for us went insane — 2M+ views organically. People still ask us about that edit. Absolute legend.",
    profile: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Priya Kadam",
    username: "@priyasalon",
    body: "We were completely offline before. He packaged our salon transformation videos so well that clients started DMing us just to book.",
    profile: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Nikhil Rao",
    username: "@nikhilbiz",
    body: "Super professional, fast turnarounds and genuinely understands what hooks work. Best investment I made for my brand's social presence.",
    profile: "https://i.pravatar.cc/150?img=60",
  },
  {
    name: "Sneha Patil",
    username: "@snehacreates",
    body: "I gave him my raw podcast clips and he returned gold. The captions, the cuts, the music — everything was just right. 10/10 recommend.",
    profile: "https://i.pravatar.cc/150?img=44",
  },
  {
    name: "Rohan Desai",
    username: "@rohandesai",
    body: "My product showcase reel hit 1.5M views and we sold out stock in 3 days. SharonRaj knows exactly how to make content that sells.",
    profile: "https://i.pravatar.cc/150?img=8",
  },
  {
    name: "Kavya Joshi",
    username: "@kavyaj",
    body: "The reels he made for my coaching business brought in 15 new enrolments from Instagram alone. The ROI speaks for itself.",
    profile: "https://i.pravatar.cc/150?img=29",
  },
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

const ReviewCard = ({
  profile,
  name,
  username,
  body,
}: {
  profile: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <Card className="relative h-full w-72 cursor-pointer overflow-hidden border border-stone-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow duration-300 p-5 rounded-2xl">
      <CardContent className="p-0 flex flex-col gap-3">
        <div className="flex flex-row items-center gap-3">
          <img
            className="rounded-full object-cover ring-2 ring-[#FF5C28]/20"
            width="40"
            height="40"
            alt={name}
            src={profile}
          />
          <div className="flex flex-col">
            <p className="text-[14px] font-bold text-[#111]">{name}</p>
            <p className="text-[12px] font-medium text-stone-400">{username}</p>
          </div>
          {/* Orange star */}
          <div className="ml-auto text-[#FF5C28] text-[16px]">★★★★★</div>
        </div>
        <p className="text-[13px] leading-[1.75] text-stone-600 line-clamp-3 font-medium">{body}</p>
      </CardContent>
    </Card>
  );
};

export default function TestimonialMarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-4 py-4">
      <Marquee pauseOnHover className="[--duration:25s] [--gap:1.25rem]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:25s] [--gap:1.25rem]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#FAF9F6] to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#FAF9F6] to-transparent"></div>
    </div>
  );
}
