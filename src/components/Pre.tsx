interface PropsPre {
  load?: boolean;
}

function Pre(props: PropsPre) {
  return <div id={props.load ? "preloader" : "preloader-none"}></div>;
}

export default Pre;
