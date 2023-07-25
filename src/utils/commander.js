import {Command} from "commander"

// const program = new Command()
// program
// .option("-d", "variable para debug", false)
// .option("-p, --port <port>", "puerto para el servidor", 8080)
// .option("--mode <mode>", "Modo de trabajo", "development")
// .requiredOption("-u <user>", "usuario utilizando la app", "No se ha declarado un usuario")
// .option("-l, --letters [letter...]", "specify letter")
// .parse()

// console.log("options: ", program.opts())
// console.log(program.args)

const commander = new Command()
commander
.option("--mode <mode>", "modo de ejecucion", "development")
.parse()

export default commander