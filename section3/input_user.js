console.log(process.argv)

var command = process.argv[2];

if(command == 'add') {
    console.log("Adding");
}
else if (command == 'read') {
    console.log("Reading");
}
else if (command == 'list') {
    console.log("Listing");
}
else if (command == 'remove') {
    console.log("Removing");
}
else {
    console.log("Command not recognised");
}
