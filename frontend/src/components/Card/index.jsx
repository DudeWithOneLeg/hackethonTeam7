import "./card.css";

const Card = ({ children }) => {
	console.log(children);
	return (
		<div className="card-container">
			<div className="card-inner">
                {children}
            </div>
		</div>
	);
};

export default Card;
