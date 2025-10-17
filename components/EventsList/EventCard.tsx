import { getRegistrationsForEvent } from "@/lib/serverActions";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import React from "react";
import { buttonVariants } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Tables } from "@/types/supabase";
import Link from "next/link";

async function EventCard({ event }: { event: Tables<"Event"> }) {
  // Format time string to remove seconds
  const time =
    new Date(event.date).toLocaleTimeString().substring(0, 4) +
    new Date(event.date).toLocaleTimeString().substring(7);

  const registrations = await getRegistrationsForEvent(event.id);

  return (
    <li key={event.id} className="col-span-1 ">
      <article className="w-full h-full ">
        <Card className="h-full flex flex-col justify-between">
          <div>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <Link className="hover:underline" href={`/events/${event.id}`}>
                  {event.title}
                </Link>
                <span className="text-muted-foreground ">
                  {event.price ? "$" + event.price : "Free"}
                </span>
              </CardTitle>
              {/* Description */}
              <div className="flex flex-col gap-2 pt-2 text-muted-foreground text-sm">
                <div className="flex gap-4">
                  <div className="flex gap-1">
                    <Calendar size={18} />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-1">
                    <Clock size={18} />
                    <span>{time}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <MapPin size={18} />
                  <span>{event.location}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3">{event.description}</p>
            </CardContent>
          </div>
          <CardFooter className="flex justify-between items-center">
            <Link
              className={buttonVariants({ variant: "default" })}
              href={`/events/${event.id}`}
            >
              Register
            </Link>
            <div className="flex gap-1 items-center text-muted-foreground ">
              <User size={20} />
              <span>{registrations}</span>
            </div>
          </CardFooter>
        </Card>
      </article>
    </li>
  );
}

export default EventCard;
