export const sumDuration = (clases) => {
    let totalMinutes = 0;

    clases.forEach(item => {
        if (item.duracion.includes("hora")) {
            const hour = Number(item.duracion.split("hora")[0]);
            totalMinutes += hour * 60
        }

        if (item.duracion.includes("minuto")) {
            const minutes = Number(item.duracion.split("minuto")[0]);
            totalMinutes += minutes
        }
    });

    let hours = Math.floor(totalMinutes / 60);
    let minutesRes = totalMinutes % 60;
    let result = [];

    if (hours > 0) result.push(`${hours}h`);
    if (minutesRes > 0) result.push(`${minutesRes}min`);

    return result.length > 0 ? result.join(" ") : "0min";
}