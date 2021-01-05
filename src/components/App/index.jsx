import debounce from 'lodash.debounce';
import React, { useEffect, useRef, useState } from 'react';
import Loading from '../Loading';
import Search from '../Search';

function App() {
  const url = 'https://kitsu.io/api/edge/anime?page[limit]=12&filter[text]=';
  const [value, setValue] = useState('');
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceText = useRef(debounce((value) => setText(value), 500)).current;

  useEffect(() => {
    if (text) {
      setLoading(true);
      fetch(url + text)
        .then((response) => response.json())
        .then((response) => {
          setItems([...response.data]);
        })
        .finally((e) => {
          setLoading(false);
        });
    }
  }, [text]);

  const handleSetValue = (e) => {
    if (items.length > 0) {
      setItems([]);
    }
    const { value } = e.target;
    setValue((state) => value);
    debounceText(value);
  };

  return (
    <div className="container mt-3">
      <div>
        <Search value={value} onChange={(e) => handleSetValue(e)} type="search" />
        {loading && <Loading />}
        <div className="row">
          {items &&
            items.map((item, index) => (
              <div className="col-4 mb-2 text-center" key={index}>
                <img
                  className="rounded-circle"
                  src={item.attributes.posterImage.small}
                  alt={item.attributes.canonicalTitle}
                />
                <p>{item.attributes.canonicalTitle}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
