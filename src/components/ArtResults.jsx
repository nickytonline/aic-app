import PropTypes from 'prop-types';

export function ArtResults({ artworks }) {
	return (
		<ul className="art-results full-width">
			{artworks.map((artwork) => {
				const { image_id, title, artist_title } = artwork;
				return (
					<li key={image_id}>
						<a
							data-artwork={JSON.stringify(artwork)}
							href={`#${image_id}`}
							id={image_id}
						>{`${title} by ${artist_title}`}</a>
					</li>
				);
			})}
		</ul>
	);
}

// The shape of the data we expect to receive based on the API response from the Art Institute of Chicago.
ArtResults.propTypes = {
	artworks: PropTypes.arrayOf(
		PropTypes.shape({
			_score: PropTypes.number.isRequired,
			thumbnail: PropTypes.shape({
				alt_text: PropTypes.string.isRequired,
				width: PropTypes.number.isRequired,
				height: PropTypes.number.isRequired,
			}).isRequired,
			date_display: PropTypes.string.isRequired,
			artist_title: PropTypes.string,
			image_id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		})
	),
};
