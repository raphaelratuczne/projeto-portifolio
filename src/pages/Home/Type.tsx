import Typewriter from "typewriter-effect";

interface ITypeProps {
  arrayValues: string[];
}

function Type({ arrayValues = ["teste"] }: ITypeProps) {
  return (
    <Typewriter
      options={{
        strings: arrayValues,
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
