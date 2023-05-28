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
	const [query, setQuery] = useState();

	window.addEventListener('popstate', (event) => {
		if (!event.newURL && event.state) {
			const artworks = event.state;
			setCurrentArtwork(null);
			setArtworks(artworks);
		}
	});

	window.addEventListener('hashchange', (event) => {
		if (!event.newURL) {
			return;
		}

		const artId = new URL(event.newURL).hash;
		// Sometimes querying by element ID resulted in an invalid selector. 🤔
		// Went with the href attribute instead.
		const artAnchor = artId ? document.querySelector(`[href="${artId}`) : null;

		if (artAnchor) {
			const artwork = JSON.parse(artAnchor.dataset.artwork);
			setCurrentArtwork(artwork);
		}
	});

	function queryArt(query) {
		// don't make too many requests to the API! Once we've built out
		// our UI, we need to make real requests!
		// @see: ./src/api.js
		searchArtworks(query).then((searchResults) => {
			const artworks = searchResults?.data;
			setArtworks(artworks);
			window?.history.pushState(artworks, '', `?q=${query}`);
			setQuery(query);
		});
	}

	function handleFormSubmit(event) {
		event.preventDefault();
		const query = event.target['query'].value;
		queryArt(query);
	}

	return (
		<div className="App">
			<h1>TCL Career Lab Art Finder</h1>
			{!currentArtwork ? (
				<SearchForm query={query} onSearchSubmit={handleFormSubmit} />
			) : null}
			{artworks && !currentArtwork ? <ArtResults artworks={artworks} /> : null}
			{currentArtwork ? <ImageDetailsPage artwork={currentArtwork} /> : null}
			<Footer />
		</div>
	);
}
