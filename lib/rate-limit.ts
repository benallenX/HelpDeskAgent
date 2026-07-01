import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const contactRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  prefix: "contact",
  analytics: false,
});
