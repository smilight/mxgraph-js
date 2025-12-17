import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { initMxGraph } from 'mxgraph-js/init';
import { mxClient, mxEvent, mxGraph, mxRubberband } from 'mxgraph-js';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="app-shell">
      <h1>mxGraph + Angular</h1>
      <p class="subtitle">Explicit init keeps the bundle lean and tree-shakeable.</p>
      <div #graphHost class="graph-host"></div>
    </div>
  `
})
export class AppComponent implements AfterViewInit {
  @ViewChild('graphHost', { static: true }) graphHost!: ElementRef<HTMLDivElement>;

  async ngAfterViewInit(): Promise<void> {
    await initMxGraph();

    const graph = new mxGraph(this.graphHost.nativeElement);
    const parent = graph.getDefaultParent();

    graph.getModel().beginUpdate();
    try {
      const v1 = graph.insertVertex(parent, null, 'Hello', 20, 40, 120, 60);
      const v2 = graph.insertVertex(parent, null, 'Angular', 220, 120, 120, 60);
      graph.insertEdge(parent, null, 'to', v1, v2);
    } finally {
      graph.getModel().endUpdate();
    }

    graph.setPanning(true);
    new mxRubberband(graph);
    mxEvent.disableContextMenu(this.graphHost.nativeElement);
    console.info('mxGraph ready', mxClient.VERSION);
  }
}
