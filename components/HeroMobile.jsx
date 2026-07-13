import HeroRigMobile from "./HeroRigMobile";

// Mobile/tablet counterpart to HeroMap — HeroMap's canvas world map is hard
// to read at small sizes, so below `lg` the hero shows this animated rig
// illustration instead. The box's aspect ratio must stay in sync with the
// hero text's top padding (see Hero.jsx) so the illustration always crops
// at the clean line under the rig's legs instead of through them.
export default function HeroMobile() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 aspect-[340/300] overflow-hidden lg:hidden"
    >
      <HeroRigMobile className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-x-0 bottom-0 h-5 bg-gradient-to-b from-transparent to-surface" />
    </div>
  );
}
