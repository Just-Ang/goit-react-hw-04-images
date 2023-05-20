export const fetchImg = (photoName, page) => fetch(
    `https://pixabay.com/api/?key=34821995-346cc43bb02fb642b37e66530&q=${photoName}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  )
    .then(res => res.json())