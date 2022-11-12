import React, { useState, useContext } from 'react';
import { Card, Header, Categories } from '../components';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

const categoryNames = ['Кроссовки', 'Ботинки', 'Туфли'];

function Home() {
  const { items } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState('');
  const { loading } = useHttp();
  const [category, setCategory] = useState(null);

  const changeSearchHandler = (event) => {
    setSearchValue(event.target.value);
  };

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return filteredItems.map((item, index) =>
      category === null ? (
        <Card key={index} {...item} />
      ) : (
        item.category === category && <Card key={index} {...item} />
      ),
    );
  };

  const onSelectCategory = (index) => {
    setCategory(index);
  };

  return (
    <div className="wrapper">
      <Header />
      <div className="content_wrapper">
        <div className="content">
          <div className="categories-search">
            <Categories
              activeCategory={category}
              onClickCategory={onSelectCategory}
              items={categoryNames}
            />
            <div className="search-block clear">
              <img src="img/search-icon.svg" alt="Search" />
              {searchValue && (
                <img
                  onClick={() => setSearchValue('')}
                  className="clear"
                  src="img/remove-cart-item.svg"
                  alt="Clear"
                />
              )}
              <input onChange={changeSearchHandler} value={searchValue} placeholder="Поиск" />
            </div>
          </div>
          <div className="items-block">{!loading && items && renderItems()}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
