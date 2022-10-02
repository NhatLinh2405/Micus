export interface ISong {
	id: number;
	key: number;
	title: string;
	subtitle: string;
	artists: { adamid: string }[];
	attributes: {
		name: string;
		albumName: string;
		artwork: {
			url: string;
		};
	};
	images: {
		coverart: string;
		adamid: string;
		background: string;
	};
	genres: {
		primary: string;
	};
	cover: string;
	url: string;
	track: number;
}

export interface IArtistData {
	artists: string[];
}

export interface IActiveSong {
	title?: string;
	subtitle?: string;
	images?: {
		coverart: string;
	};
}

export interface IArtists {
	id: number;
	key: number;
	name: string;
	tracks: {
		hits: ISong[];
	};
	subtitle: string;
	artists: { adamid: string }[];
	images: {
		coverart: string;
	};
	cover: string;
	url: string;
}

export interface IControls {
	repeat: boolean;
	shuffle: boolean;
	currentSongs: any[];
	setRepeat: React.Dispatch<React.SetStateAction<boolean>>;
	setShuffle: React.Dispatch<React.SetStateAction<boolean>>;
	handlePlayPause: () => void;
	handlePrevSong: () => void;
	handleNextSong: () => void;
}
