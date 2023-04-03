import './ItemCard.scss';

export interface Item {
  id: number;
  company: string;
  name: string;
  price: number;
  image: string;
  bookmarked: boolean;
}

export default function ItemCard(item: Item) {
  const { company, name, price, image, bookmarked } = item;
  // return item card with company, name, price, image, and bookmarked
  return (
    <div className="item-card">
      <div className="item-card__bookmark">
        <img
          src={bookmarked ? '/icons/bookmark-on.png' : '/icons/bookmark-off.png'}
          alt="bookmark"
        />
      </div>
      <div className="item-card__image">
        <img src={image} alt="item" />
      </div>
      <div className="item-card__info">
        <div className="item-card__info__company">{company}</div>
        <div className="item-card__info__name">{name}</div>
        <div className="item-card__info__price">{price.toLocaleString()}</div>
      </div>
    </div>
  );
}
