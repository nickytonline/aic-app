import { useState } from 'react';

import { searchArtworks } from '../api';
import { SearchForm } from './SearchForm';
import { Footer } from './Footer';
import { ArtResults } from './ArtResults';
import { ImageDetailsPage } from './ImageDetailsPage';

import './App.css';

export function App() {
	const [artworks, setArtworks] = useState();
	const [currentArtwork, setCurrentArtwork] = useState();

	window.addEventListener('hashchange', (event) => {
		const artId = new URL(event.newURL).hash;
		const artwork = JSON.parse(document.querySelector(artId).dataset.artwork);
		setCurrentArtwork(artwork);
	});

	function onSearchSubmit(query) {
		// don't make too many requests to the API! Once we've built out
		// our UI, we need to make real requests!
		// @see: ./src/api.js
		searchArtworks(query).then((searchResults) => {
			const artworks = searchResults?.data;
			setArtworks(artworks);
			window.history.pushState(artworks, `?q=${query}`);
		});
	}

	return (
		<div className="App">
			<h1>TCL Career Lab Art Finder</h1>
			<SearchForm onSearchSubmit={onSearchSubmit} />
			{artworks && !currentArtwork ? <ArtResults artworks={artworks} /> : null}
			{currentArtwork ? <ImageDetailsPage artwork={currentArtwork} /> : null}
			<Footer />
		</div>
	);
}
