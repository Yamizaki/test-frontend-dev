export default function CourseHeader({ title }) {
  return (
    <header className="bg-gray-500 text-white border-b p-4">
      <section className="@container">
        <article>
          <h1 className="text-4xl font-bold text-center">{title || "Modulo 1: Introduccion al Desarrollo Web"}</h1>
        </article>
      </section>
    </header>
  );
}
