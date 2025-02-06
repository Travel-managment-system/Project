function SearchCity() {
    const cityName=sessionStorage.getItem('cityName')
    const cityId = sessionStorage.getItem('cityId')
    return (<>
    <div>this is city component {cityName}</div>
    </>  );
}

export default SearchCity;