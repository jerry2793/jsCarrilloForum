import Typewriter from 'typewriter-effect'

export default props => {
    return (<div>
     <h1>
<Typewriter
//   onInit={(typewriter) => {
//     typewriter.typeString('Hello World!')
//       .callFunction(() => {
//         console.log('String typed out!');
//       })
//       .pauseFor(20)
//       .deleteAll()
//       .callFunction(() => {
//         console.log('All strings were deleted');
//       })
//       .start();
//   }}
  options={{
      strings: ['hello', 'world'],
      autoStart: true,
      loop: true
  }}
/>
</h1>   
    </div>)
}