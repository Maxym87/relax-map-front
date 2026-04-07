import css from "./LocationCard.module.css";
import { Location } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import StarRating from "../ui/star-rating";

type LocationCardProps = {
  location: Location;
};
 
export default function LocationCard({ location }: LocationCardProps) {
  return (
    <article className={css.card}>
      
      {location.image && (<Image src={location.image} alt={location.name} width="420" height="200" />)}

      <div className={css.content}>
        <p className={css.typeText}>{location.locationType}</p>
        <StarRating rate={location.rate ?? 0} size={22} />
        <h3 className={css.title}>{location.name}</h3>

        <Link href={`/locations/${location._id}`} className={`secondary-btn ${css.button}`}>
          Переглянути локацію
        </Link>
      </div>
    </article>
  );
}