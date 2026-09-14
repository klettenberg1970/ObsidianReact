
export default function StartButtons({ handleOrdner, onNew }) {

  return (
    <div className='startButtons'>
      <button onClick={handleOrdner}>IMB</button>
      <button onClick={handleOrdner}>Programmieren</button>
      <button onClick={handleOrdner}>Sonstiges</button>
      <button onClick={handleOrdner}>Links</button>
      <button onClick={handleOrdner}>KI</button>
      <button onClick={handleOrdner}>Unsortiert</button>

      <button className="neuButton" onClick={onNew}> NEU</button>
    </div>
  )
}