import './ItemCard.scss';

export interface Item {
  id: number;
  name: string;
  price: number;
  brand: string;
  imgUrl: string;
  bookmarked: boolean;
}

export default function ItemCard(item: Item) {
  const { brand, name, price, imgUrl, bookmarked } = item;
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
        <img src={imgUrl} alt="item" />
      </div>
      <div className="item-card__info">
        <div className="item-card__info__company">{brand}</div>
        <div className="item-card__info__name">{name}</div>
        <div className="item-card__info__price">{price.toLocaleString()}</div>
      </div>
    </div>
  );
}
