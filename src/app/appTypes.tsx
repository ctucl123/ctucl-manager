
// typados para el registro de lineas
interface newDate {
	day: number,
	month: number,
	year: number,
	hours: number,
	minutes: number,
	seconds: number
}
type resumePoint = {
	id: string,
	position: number
}

interface newLine {
	group: string,
	id: string,
	date: newDate,
	starting: resumePoint[],
	return: resumePoint[],
	name: string,
	description: string,
	lastModify: any[]
}




//exportacion de los typados
export type {
    newDate,
    newLine,
    resumePoint
}