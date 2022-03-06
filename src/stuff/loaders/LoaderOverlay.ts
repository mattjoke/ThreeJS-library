import '../loaders/loader.css';

/**
 * Description placeholder
 * @author Matej Hakoš
 *
 * @return {*}
 */
const LoaderOverlay = () => {
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.innerText = 'Loading...';

  div.innerHTML =
    '<div class="loader-container"><div class="loader">Loading...</div></div>';

  div.style.pointerEvents = 'none';
  div.style.top = '0';
  div.style.width = 'inherit';
  div.style.height = 'inherit';
  div.style.backgroundColor = 'white';

  return div;
};

export default LoaderOverlay;
