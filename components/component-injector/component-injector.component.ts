
import {
  Component,
  Input,
  OnInit,
  ComponentFactoryResolver, Type,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  EventEmitter,
  Output,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'component-injector',
  templateUrl: './component-injector.component.html',
  styleUrls: ['./component-injector.component.scss']
})
export class ComponentInjectorComponent implements OnInit, AfterViewInit, OnChanges {

  /**
   * @ViewChild('container)
   */
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef | undefined;

  /**
   * @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
   */
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef | undefined;

  /**
   * @Input() public component: Type<any>;
   */
  @Input() public component: Type<any> | undefined;
  
  /**
   * @Input() public params: any;
   */
  @Input() public params: any = {};

  /**
   * @Input() public events: any;
   */
  @Input() public events: any = {};

  /**
   * @Input() public classList: string;
   */
  @Input() public classList: string | undefined;
  

  /**
   * @attribute {componentFactoryResolver} componentRef
   */
  public componentRef: any;

  /**
   * @description: 
   */
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  /**
   * @method {boolean} isMenuCollapsed
   */
  public ngOnInit() {
    if (this.component === undefined) {
      console.error('ComponentInjectorComponent: component is undefined');
      // alert('aooeuaoeaou'); 
      return;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
    this.componentRef = this.container?.createComponent(componentFactory);


    this.define_input_list();
    this.define_output_list();
  }

  /**
   * @method {boolean} define_input_list
   */
  public define_input_list() {
    if (this.componentRef === undefined) { return; }
    Object.assign(this.componentRef.instance, this.params);
  }

  /**
   * @define_output_list : set the output function
   */
  public define_output_list() {
    let output_list = {};
    for (let key of Object.keys(this.componentRef.instance)) {
      // has eventemitter
      if (this.componentRef.instance[key] instanceof EventEmitter) {
        (output_list as any)[key] = this.componentRef.instance[key];
      }
    }

    for (let key of Object.keys(this.events)) {
      const subscribe_function = (this.events[key] as any);
      if (subscribe_function === undefined) {
        continue;
      }

      this.componentRef.instance[key].subscribe((data: any) => { 
        this.events[key](data);
      });

    }


  }
  /**
   * @angular-method {void} ngAfterViewInit
   */
  public ngAfterViewInit() {

  }

  /**
   * @description: 
   */
  public ngOnChanges() {
    
  }
}

