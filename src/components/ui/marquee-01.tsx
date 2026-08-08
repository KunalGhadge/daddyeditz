import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Riya Mehta",
    username: "@riyacreates",
    body: "Sid Graphics redesigned our restaurant menu and social posts — customers started commenting on our branding immediately. Sales went up in 2 weeks.",
    profile: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Aditya Shinde",
    username: "@adityafit",
    body: "The logo he made for our gym is just perfect. Clean, bold, and professional. Every client asks where we got it done.",
    profile: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Priya Kadam",
    username: "@priyasalon",
    body: "We were getting no attention on Instagram before. After Sid Graphics made our posts, we went from 200 to 1,200 followers in a month.",
    profile: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Nikhil Rao",
    username: "@nikhilbiz",
    body: "Super fast, very creative, and genuinely understands what looks good for business. Best investment for my brand.",
    profile: "https://i.pravatar.cc/150?img=60",
  },
  {
    name: "Sneha Patil",
    username: "@snehacreates",
    body: "I gave him my brand colors and a rough idea, and he returned a full brand kit. Posters, logo, social templates — everything matched perfectly.",
    profile: "https://i.pravatar.cc/150?img=44",
  },
  {
    name: "Rohan Desai",
    username: "@rohandesai",
    body: "Our product launch posters by Sid Graphics helped us sell out our stock in 3 days. The designs just stop you from scrolling.",
    profile: "https://i.pravatar.cc/150?img=8",
  },
  {
    name: "Kavya Joshi",
    username: "@kavyaj",
    body: "The social media creatives he made for my coaching page brought in 12 new leads from Instagram alone. Highly recommended.",
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
    <figure
      className={cn(
        "relative w-72 sm:w-80 cursor-pointer overflow-hidden rounded-2xl border p-6",
        "border-stone-200/60 bg-white/70 backdrop-blur-sm shadow-sm",
        "hover:shadow-md hover:border-stone-300 transition-all duration-300"
      )}
    >
      <div className="flex flex-row items-center gap-3 mb-4">
        <img className="rounded-full w-10 h-10 object-cover" alt={name} src={profile} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-bold text-[#111]">{name}</figcaption>
          <p className="text-xs font-medium text-stone-400">{username}</p>
        </div>
      </div>
      <blockquote className="text-sm leading-relaxed text-stone-500">{body}</blockquote>
    </figure>
  );
};

export default function TestimonialMarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-4 py-4">
      <Marquee pauseOnHover className="[--duration:35s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:35s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-[#F7F6F3]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-[#F7F6F3]" />
    </div>
  );
}
