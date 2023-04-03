import '../assets/styles/Home.scss';
import ItemCard from '../components/ItemCard';
import type { Item } from '../components/ItemCard';

interface Category {
  title: string;
  items: Array<Item>;
}

// API 연동 후 사라질 코드
const categoryList: Array<Category> = [
  {
    title: '친구야 졸업 축하해!',
    items: [
      {
        id: 1,
        name: '레저렉션 아로마틱 핸드 밤',
        image: 'https://img.marieclairekorea.com/2019/12/mck_5e1d183804e42.jpg',
        company: 'Aesop',
        price: 31000,
        bookmarked: false,
      },
      {
        id: 2,
        name: '졸업 축하 선물 2222',
        image:
          'https://cdn.shopify.com/s/files/1/0592/6181/2894/products/3348901571456_0.jpg?crop=center&height=800&v=1663826265&width=800',
        company: 'Aesop',
        price: 20000,
        bookmarked: false,
      },
      {
        id: 3,
        name: '졸업 축하 선물 2222',
        image:
          'https://cdn.shopify.com/s/files/1/0592/6181/2894/products/3348901571456_0.jpg?crop=center&height=800&v=1663826265&width=800',
        company: 'Aesop',
        price: 20000,
        bookmarked: false,
      },
      {
        id: 4,
        name: '졸업 축하 선물 2222',
        image:
          'https://cdn.shopify.com/s/files/1/0592/6181/2894/products/3348901571456_0.jpg?crop=center&height=800&v=1663826265&width=800',
        company: 'Aesop',
        price: 20000,
        bookmarked: false,
      },
    ],
  },
  {
    title: '선생님 존경하는거 아시죠?',
    items: [
      {
        id: 5,
        name: '졸업 축하 선물',
        image:
          'https://image.jtbcplus.kr/data/contents/jam_photo/202201/03/1667c94e-1ef9-4949-8951-41a7b28212b7.jpg',
        company: 'Aesop',
        price: 49999,
        bookmarked: false,
      },
      {
        id: 6,
        name: '졸업 축하 선물 2222',
        image: 'https://cdn.imweb.me/thumbnail/20220311/31e8480978fc8.jpg',
        company: 'Aesop',
        price: 39900,
        bookmarked: false,
      },
    ],
  },
  {
    title: '선생님 존경하는거 아시죠? BB',
    items: [
      {
        id: 6,
        name: '졸업 축하 선물',
        image:
          'https://image.jtbcplus.kr/data/contents/jam_photo/202201/03/1667c94e-1ef9-4949-8951-41a7b28212b7.jpg',
        company: 'Aesop',
        price: 49999,
        bookmarked: false,
      },
      {
        id: 7,
        name: '졸업 축하 선물 2222',
        image: 'https://cdn.imweb.me/thumbnail/20220311/31e8480978fc8.jpg',
        company: 'Aesop',
        price: 39900,
        bookmarked: false,
      },
    ],
  },
];

const Home = () => {
  return (
    <>
      {/* logo cherishu on left and search icon and profile icon on right */}
      <div className="header">
        <div className="logo-text">Cherishu</div>
        <div className="icons">
          <img src="/icons/search.png" width="14px" />
          <img src="/icons/profile.png" width="14px" />
        </div>
      </div>
      <div className="main-image"></div>
      <div className="container">
        <div className="category-header">요즘 핫한 선물 추천</div>
        {[...categoryList].map(category => (
          <div className="category">
            <div className="category-title">{category.title}</div>
            <div className="category-list">
              {category.items.map(item => (
                <ItemCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Home;
