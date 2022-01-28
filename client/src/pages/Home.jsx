import React from 'react';
import { Card, Header } from '../components';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

function Home() {
  const { items } = React.useContext(AuthContext);
  const [searchValue, setSearchValue] = React.useState('');
  const { loading } = useHttp();

  const changeSearchHandler = (event) => {
    setSearchValue(event.target.value);
  };

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return filteredItems.map((item, index) => <Card key={index} {...item} />);
  };

  return (
    <div className="wrapper">
      <Header />
      <div className="content_wrapper">
        <div className="content">
          <div className="categories-search">
            <h2 className="label_text">товары</h2>
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
