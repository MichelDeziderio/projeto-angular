import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from '../../models/user.model';
import { UserService } from './users.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let localStorageSpy: jasmine.SpyObj<Storage>;

  const mockUsers: User[] = [
    {
      "name": "Joao da Silva",
      "cpf": "26899337649",
      "phone": "4233335555",
      "email": "joao@joaosilva.com.br"
    },
    {
      "name": "Maria Antonieta",
      "cpf": "65138896180",
      "phone": "1255553333",
      "email": "maria@mariaantonieta.com.br"
    },
    {
      "name": "Luiz Souza",
      "cpf": "32420496329",
      "phone": "1144446666",
      "email": "luiz@luizsouza.com.br"
    }
  ];

  beforeEach(() => {
    localStorageSpy = jasmine.createSpyObj('localStorage', ['getItem', 'setItem', 'removeItem']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: Storage, useValue: localStorageSpy }
      ]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorageSpy.getItem.and.returnValue(null);
    localStorageSpy.setItem.calls.reset();
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should remove a user by CPF', async () => {

    localStorage.removeItem('tinnova-users');
    localStorage.setItem('tinnova-users', JSON.stringify(mockUsers));
    localStorageSpy.getItem.and.returnValue(JSON.stringify(mockUsers));

    service.removeUser('78912345678');

    const remainingUsers = mockUsers.filter(u => u.cpf !== '78912345678');

    let users: User[] | undefined;
    await service.getUsers().subscribe(u => {
      users = u;
      expect(users).toEqual(remainingUsers);
    });
  });

  it('should initialize users from localStorage if present', async () => {
    localStorage.removeItem('tinnova-users');
    localStorage.setItem('tinnova-users', JSON.stringify(mockUsers));
    localStorageSpy.getItem.and.returnValue(JSON.stringify(mockUsers));

    let users: User[] | undefined;
    await service.getUsers().subscribe(u => {
      users = u;
      expect(users).toEqual(mockUsers);
    });
  });

  it('should add a user without special characters', async () => {

    localStorage.removeItem('tinnova-users');
    localStorage.setItem('tinnova-users', JSON.stringify(mockUsers));
    localStorageSpy.getItem.and.returnValue(JSON.stringify(mockUsers));

    const newUser: User = { cpf: '78912345678', name: 'New User', email: 'newuser@example.com', phone: '3333333333' };
    service.addUser(newUser);

    const currentUsers = [...mockUsers, newUser];

    await service.getUsers().subscribe(users => {
      expect(users).toEqual(currentUsers);
    });

  });

});
