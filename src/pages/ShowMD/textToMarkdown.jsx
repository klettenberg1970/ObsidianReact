
import ReactMarkdown from 'react-markdown';
import './markdown.css';

export default function TextToMarkdown ({text})  {

const formatieren = ()=>{
  if (!text || typeof text !== 'string') return '';
  return text.replace(/\[\[([^\]]+)\]\]/g, (match, name) => {
    const anzeigeName = name.replace(/^\d+[-_]/, '');
    return `[${anzeigeName}](${name})`;
  });}

  return(
     <div className="markdown">
          <ReactMarkdown
            components={{
              a: ({ href, children }) => {
                const istExtern = href.startsWith('http://') || href.startsWith('https://');

                if (istExtern) {
                  return <a href={href} target="_blank" rel="noreferrer">{children}</a>;
                } else {
                  return (
                    <span
                      onClick={() => onDateiOeffnen(href)}
                      className="markdown-internerLink"
                    >
                      {children}
                    </span>
                  );
                }
              }
            }}
          >
           {formatieren (text)}
          </ReactMarkdown>
        </div>
  )
}