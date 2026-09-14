export default function ShowMdDateien({ mdDateien, onMdAuswahl }) {
  //                                  ⬆️ Props empfangen

  return (
    <div className="md-dateien">
      {mdDateien?.dateien?.map(({ id, name }) => (
        <div className="dateiName" key={id}>
          {/* 📌 onMdAuswahl wird aufgerufen */}
          <button onClick={() => onMdAuswahl(id)}>
            {name}
          </button>
        </div>
      ))}
    </div>
  );
}