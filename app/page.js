import Image from "next/image";
import { fetchGoogleNews } from "../lib/news";

const localNews = [
  {
    title: "Bordeaux et la Gironde, carrefour des operations mid-market",
    text: "Une densite elevee de PME, de fonds regionaux et de conseils specialises nourrit un flux constant de cessions et de build-ups.",
  },
  {
    title: "Toulouse tire la demande sur la tech et l'industrie",
    text: "Aeronautique, logiciels B2B et sous-traitance industrielle structurent les dossiers les plus suivis du moment.",
  },
  {
    title: "Biarritz, Pau et Bayonne gagnent en visibilite",
    text: "Les territoires cotiers et pyreneens attirent davantage d'investisseurs recherchant des plateformes de croissance a taille humaine.",
  },
];

const focusAreas = [
  "Cessions de PME",
  "Build-up sectoriels",
  "Transmission familiale",
  "Capital-developpement",
];

export default async function Home() {
  const news = await fetchGoogleNews();

  return (
    <main className="page">
      <section className="hero">
        <div className="hero__content">
          <div className="brand-mark">
            <Image
              src="/logo.png"
              alt="Sud Ouest Finance"
              width={112}
              height={112}
              priority
            />
          </div>
          <p className="eyebrow">Sud-Ouest France · M&A</p>
          <h1>Le media business des operations M&A dans le Sud-Ouest.</h1>
          <p className="lead">
            Une vitrine claire pour suivre les transmissions, les levees de
            fonds et les mouvements strategiques qui faconnent Bordeaux,
            Toulouse, Bayonne, Pau et leur ecosysteme.
          </p>
          <div className="chips">
            {focusAreas.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
        </div>
        <aside className="hero__panel">
          <div className="panel-card">
            <p className="panel-kicker">Angle editorial</p>
            <h2>Relier terrain local et deal flow national.</h2>
            <p>
              Le site combine une lecture territoriale des entreprises du
              Sud-Ouest avec un flux automatise des actualites M&A issues de
              Google News.
            </p>
          </div>
        </aside>
      </section>

      <section className="section">
        <div className="section__header">
          <p className="eyebrow">News locales</p>
          <h2>Le pouls business du territoire</h2>
        </div>
        <div className="grid">
          {localNews.map((item) => (
            <article key={item.title} className="card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <p className="eyebrow">Google News</p>
          <h2>Mouvements recents en M&A</h2>
        </div>
        <div className="news-list">
          {news.length ? (
            news.map((item) => (
              <a
                key={item.link}
                href={item.link}
                className="news-item"
                target="_blank"
                rel="noreferrer"
              >
                <div>
                  <p className="news-meta">{item.source}</p>
                  <h3>{item.title}</h3>
                  <p>{item.snippet}</p>
                </div>
                <span className="news-date">{item.pubDate}</span>
              </a>
            ))
          ) : (
            <div className="card">
              <p>
                Le flux Google News n'a pas renvoye d'article pour le moment.
                Reessaie dans quelques instants.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
