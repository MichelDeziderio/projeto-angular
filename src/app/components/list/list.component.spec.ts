import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('filteredUsers', () => {
    beforeEach(() => {
      component.users = [
        { name: 'Alice Smith', email: 'alice@example.com', cpf: '123', phone: '111' } as any,
        { name: 'Bob Jones', email: 'bob@example.com', cpf: '456', phone: '222' } as any,
        { name: 'Carol White', email: 'carol@sample.com', cpf: '789', phone: '333' } as any,
      ];
    });

    it('should return all users if searchTerm is empty', () => {
      component.searchTerm = '';
      expect(component.filteredUsers().length).toBe(3);
    });

    it('should filter users by name (case-insensitive)', () => {
      component.searchTerm = 'alice';
      const result = component.filteredUsers();
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Alice Smith');
    });

    it('should filter users by email (case-insensitive)', () => {
      component.searchTerm = 'bob@EXAMPLE.com';
      const result = component.filteredUsers();
      expect(result.length).toBe(1);
      expect(result[0].email).toBe('bob@example.com');
    });

    it('should return empty array if no user matches', () => {
      component.searchTerm = 'notfound';
      expect(component.filteredUsers().length).toBe(0);
    });

    it('should handle null users gracefully', () => {
      component.users = null;
      component.searchTerm = 'alice';
      expect(component.filteredUsers()).toEqual([]);
    });

    it('should emit editUser event when onEdit is called', () => {
      spyOn(component.editUser, 'emit');
      const user = { name: 'Test', email: 'test@test.com', cpf: '000', phone: '000' } as any;
      component.onEdit(user);
      expect(component.editUser.emit).toHaveBeenCalledWith(user);
    });

    it('should emit removeUser event and call alertService.success when onRemove is called', () => {
      spyOn(component.removeUser, 'emit');
      const alertServiceSpy = spyOn((component as any).alertService, 'success');
      const cpf = '12345678900';
      component.onRemove(cpf);
      expect(component.removeUser.emit).toHaveBeenCalledWith(cpf);
      expect(alertServiceSpy).toHaveBeenCalledWith('Usuário excluido com sucesso!', 8000);
    });

    it('should toggle modeView between list and grid', () => {
      expect(component.modeView).toBe('list');
      component.toggleView();
      expect(component.modeView).toBe('grid');
      component.toggleView();
      expect(component.modeView).toBe('list');
    });
  });
});
