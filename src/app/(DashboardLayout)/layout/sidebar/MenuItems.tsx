import {
  IconLayoutDashboard,
  IconBus,
  IconMap2,
  IconList,
  IconAddressBook,
  IconRectangularPrism,
  IconBuildingStore,
  IconChecks
,} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Puntos De Control",
  },
  {
    id: uniqueId(),
    title: "Registrar Puntos",
    icon: IconAddressBook,
    href: "/register_points",
  },
  {
    id: uniqueId(),
    title: "Listado de Puntos",
    icon: IconMap2,
    href: "/listado_points",
  },
  {
    navlabel: true,
    subheader: "Lineas",
  },
  {
    id: uniqueId(),
    title: "Registrar Linea",
    icon: IconBus,
    href: "/register_line",
  },
  {
    id: uniqueId(),
    title: "Listado de Lineas",
    icon: IconList,
    href: "/listado_lines",
  },
  {
    navlabel: true,
    subheader: "Recargadores",
  },
  {
    id: uniqueId(),
    title: "Registro establecimiento",
    icon: IconBuildingStore,
    href: "/Recharge_points",
  },
  {
    id: uniqueId(),
    title: "Establecimientos activos",
    icon: IconChecks,
    href: "/Dashboard_recharge_points",
  },
];

export default Menuitems;
