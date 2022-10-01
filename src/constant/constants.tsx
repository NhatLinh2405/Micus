import { HiOutlineHashtag, HiOutlinePhotograph, HiOutlineUserGroup } from "react-icons/hi";
import { ImEarth } from "react-icons/im";

export const genres = [
	{ id: 1, title: "Pop", value: "POP" },
	{ id: 2, title: "Hip-Hop", value: "HIP_HOP_RAP" },
	{ id: 3, title: "Dance", value: "DANCE" },
	{ id: 4, title: "Electronic", value: "ELECTRONIC" },
	{ id: 5, title: "Soul", value: "SOUL_RNB" },
	{ id: 6, title: "Alternative", value: "ALTERNATIVE" },
	{ id: 7, title: "Rock", value: "ROCK" },
	{ id: 8, title: "Latin", value: "LATIN" },
	{ id: 9, title: "Film", value: "FILM_TV" },
	{ id: 10, title: "Country", value: "COUNTRY" },
	{ id: 11, title: "Worldwide", value: "WORLDWIDE" },
	{ id: 12, title: "Reggae", value: "REGGAE_DANCE_HALL" },
	{ id: 13, title: "House", value: "HOUSE" },
	{ id: 14, title: "K-Pop", value: "K_POP" },
];

export const links = [
	{ name: "Discover", to: "/", icon: ImEarth },
	{ name: "Around You", to: "/around-you", icon: HiOutlinePhotograph },
	{ name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
	{ name: "Top Charts", to: "/top-charts", icon: HiOutlineHashtag },
];
