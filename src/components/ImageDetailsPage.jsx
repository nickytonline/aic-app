import PropTypes from 'prop-types';

export function ImageDetailsPage({ artwork }) {
	const { image_id, thumbnail, title, artist_title } = artwork;
	return (
		<>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					window.history.back();
				}}
			>
				<button className="button">Back</button>
			</form>
			<article>
				<img
					alt={thumbnail.alt_text}
					height={thumbnail.height}
					src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`}
					width={thumbnail.width}
				/>
				<h2>{title}</h2>
				<p>{artist_title}</p>
			</article>
		</>
	);
}

ImageDetailsPage.propTypes = {
	artwork: PropTypes.shape({
		_score: PropTypes.number.isRequired,
		thumbnail: PropTypes.shape({
			alt_text: PropTypes.string.isRequired,
			width: PropTypes.number.isRequired,
			height: PropTypes.number.isRequired,
		}).isRequired,
		date_display: PropTypes.string.isRequired,
		artist_title: PropTypes.string.isRequired,
		image_id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	}),
};
