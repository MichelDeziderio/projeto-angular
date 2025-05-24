import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent, HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call userService.removeUser with the correct cpf when remove is called', () => {
    const userServiceSpy = spyOn((component as any).userService, 'removeUser');
    const testCpf = '12345678900';
    component.remove(testCpf);
    expect(userServiceSpy).toHaveBeenCalledWith(testCpf);
  });
});
