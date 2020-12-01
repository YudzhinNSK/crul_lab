const fs = require('fs')
const path = './data/data.json';
const url = require('url');

let data = JSON.parse(fs.readFileSync(path, 'utf8'))

exports.create = function (req, res) {
    let new_pet = req.url.split('/')[1];
    if (new_pet === '') {
        res.send('Empty name of the pet - try again');
    } else {
        data.animals.push(new_pet);
        fs.writeFileSync(path, JSON.stringify(data));
        res.send('Animal added: ' + new_pet);
    }
}

exports.read = function (req, res) {
    let size = Object.keys(data.animals).length;
    let output = 'All animals: ';
    for (let i = 0; i < size; i++) {
        output += data.animals[i];
        if (i != size - 1) {
            output += ', ';
        }
    }
    output += '<br>';
    res.send(output);
}


exports.update = function (req, res) {
    let new_animal = req.url.split('/')[1];
    data.animals[0] = new_animal;
    fs.writeFileSync(path, JSON.stringify(data));
    res.send('First animal replaced: ' + new_animal);
}

exports.delete = function (req, res) {
    let size = Object.keys(data.animals).length;
    let id = parseInt(req.url.split('/')[1]);
    if (!Number.isSafeInteger(id) || id < 0 || id >= size) {
        res.send('Incorrect id - try again' + id);
    } else {
        data.animals.splice(id, 1);
        fs.writeFileSync(path, JSON.stringify(data));
        res.send('Animal with id ' + id + 'deleted');
    }
}

