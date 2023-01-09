// Todo Find out why you have to move exports to fix a "module has no exports" error.

export { FindError, SaveError, UpdateError, RemoveError } from './errors';
export {
    type Adresse,
    type Kunde,
    type KundeShared,
    type Geschlecht,
    type Familienstand,
    type Interessen,
    type Umsatz,
    type User,
} from './kunde';
export {
    KundeReadService,
    type KundenServer,
    type Suchkriterien,
} from './kundeRead.service';
export { KundeWriteService } from './kundeWrite.service';
