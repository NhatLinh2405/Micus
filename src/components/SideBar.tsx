import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineCloseCircle, AiOutlineMenu } from "react-icons/ai";
import logo from "../assets/logo.png";

import { links } from "../constant/constants";

export default function SideBar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const NavLinks = () => (
		<div className="px-3 sm:px-5">
			{links.map((item) => (
				<NavLink
					key={item.name}
					to={item.to}
					className="justify-start my-8 text-sm font-medium text-white flex-center-y hover:text-cyan-400"
					onClick={() => {}}
				>
					<item.icon className="w-6 h-6 mr-2" />
					{item.name}
				</NavLink>
			))}
		</div>
	);

	return (
		<>
			<div className="md:flex hidden flex-col w-[220px] py-10 px-4 bg-[#191624]">
				<Link to="/">
					<img src={logo} alt="logo" className="object-contain w-full h-16" />
				</Link>

				<h1 className="my-4 text-3xl font-bold tracking-wider text-center text-white animate-pulse">
					Music
				</h1>
				<NavLinks />
			</div>
			<div className="absolute block md:hidden top-6 right-3 z-[3]">
				{mobileMenuOpen ? (
					<AiOutlineCloseCircle
						className="w-6 h-6 mr-2 text-white"
						onClick={() => setMobileMenuOpen(false)}
					/>
				) : (
					<AiOutlineMenu
						className="w-6 h-6 mr-2 text-white"
						onClick={() => setMobileMenuOpen(true)}
					/>
				)}
			</div>
			<div
				className={`absolute top-0 h-screen w-1/2 bg-gradient-to-r from-indigo-500 to-to-pink-500 backdrop-blur-lg backdrop-blur-lz z-10 p-6 md:hidden smooth-transition ${
					mobileMenuOpen ? "left-0" : "-left-full"
				}`}
			>
				<img src={logo} alt="logo" className="object-contain w-full h-16" />
				<h1 className="my-4 text-3xl font-bold tracking-wider text-center text-white animate-pulse">
					Music
				</h1>
				<NavLinks />
			</div>
		</>
	);
}
