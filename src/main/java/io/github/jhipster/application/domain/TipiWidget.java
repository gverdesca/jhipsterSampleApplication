package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TipiWidget.
 */
@Entity
@Table(name = "tipi_widget")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TipiWidget implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 100)
    @Column(name = "db_tipo", length = 100)
    private String dbTipo;

    @Size(max = 100)
    @Column(name = "db_tipo_cont", length = 100)
    private String dbTipoCont;

    @Column(name = "fl_drill")
    private Boolean flDrill;

    @OneToOne
    @JoinColumn(unique = true)
    private WidgetImpl widgetImpl;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDbTipo() {
        return dbTipo;
    }

    public TipiWidget dbTipo(String dbTipo) {
        this.dbTipo = dbTipo;
        return this;
    }

    public void setDbTipo(String dbTipo) {
        this.dbTipo = dbTipo;
    }

    public String getDbTipoCont() {
        return dbTipoCont;
    }

    public TipiWidget dbTipoCont(String dbTipoCont) {
        this.dbTipoCont = dbTipoCont;
        return this;
    }

    public void setDbTipoCont(String dbTipoCont) {
        this.dbTipoCont = dbTipoCont;
    }

    public Boolean isFlDrill() {
        return flDrill;
    }

    public TipiWidget flDrill(Boolean flDrill) {
        this.flDrill = flDrill;
        return this;
    }

    public void setFlDrill(Boolean flDrill) {
        this.flDrill = flDrill;
    }

    public WidgetImpl getWidgetImpl() {
        return widgetImpl;
    }

    public TipiWidget widgetImpl(WidgetImpl widgetImpl) {
        this.widgetImpl = widgetImpl;
        return this;
    }

    public void setWidgetImpl(WidgetImpl widgetImpl) {
        this.widgetImpl = widgetImpl;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TipiWidget tipiWidget = (TipiWidget) o;
        if (tipiWidget.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tipiWidget.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TipiWidget{" +
            "id=" + getId() +
            ", dbTipo='" + getDbTipo() + "'" +
            ", dbTipoCont='" + getDbTipoCont() + "'" +
            ", flDrill='" + isFlDrill() + "'" +
            "}";
    }
}
