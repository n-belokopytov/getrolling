import { OWNER_PROFILE } from './owner';

export const BRAND = {
  name: 'GetRolling',
  domainSuffix: '.tech',
  topbarHeadline: "Let's get your project rolling.",
  tagline: 'Hands-on help for faster, safer delivery',
};

export const SITE_METADATA = {
  title: `${BRAND.name}${BRAND.domainSuffix} | Delivery and Reliability, Hands-on`,
  description:
    `${OWNER_PROFILE.fullName}, ${OWNER_PROFILE.role}. Hands-on help for CTOs and product leaders to ship faster, cut incidents, and fix ownership gaps.`,
};
